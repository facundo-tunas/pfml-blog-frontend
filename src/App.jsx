import { useState, useEffect } from "react";
import Login from "./components/Login";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setIsLoggedIn(true);
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="App">
      <h1>Welcome to My Blog!</h1>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <div>
          <p>You are logged in as: {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
