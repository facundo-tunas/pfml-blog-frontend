import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate

import Header from "./components/header/Header";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";

import "./reset.css";
import "./App.css";
import "./variables.css";
import Post from "./pages/Post";
import { LoadingProvider } from "./contexts/LoadingContext";
import { PopupProvider } from "./contexts/PopupContext";

import ModeContext from "./contexts/darkModeContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // fetch login jwt token if exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setIsLoggedIn(true);
      setUser(decodedToken);

      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expirationTime > currentTime) {
        const timeoutDuration = expirationTime - currentTime;
        const logoutTimer = setTimeout(() => {
          handleLogout();
        }, timeoutDuration);

        return () => clearTimeout(logoutTimer);
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser({});
    location.reload();
  };

  // preload auth image
  useEffect(() => {
    const image = new Image();
    image.src = "/login-photo.jpg";
  }, []);

  // handle dark mode
  const { mode, setMode } = useContext(ModeContext);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
    if (mode == "dark") {
      document.querySelector(":root").classList.add("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <Router>
      <Header user={user} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <LoadingProvider>
        <PopupProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Auth type={true} />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" /> : <Auth type={false} />}
            />{" "}
          </Routes>
        </PopupProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App;
