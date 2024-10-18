import { useState } from "react";
import "./Auth.css";
import PropTypes from "prop-types";

const AuthForm = ({ type }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = type ? `${API_URL}/users/login` : `${API_URL}/users`;
    const body = type ? { email, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
        return;
      }

      const data = await response.json();
      if (type) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        window.location.href = "/login";
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred while trying to authenticate.");
    }
  };

  return (
    <main>
      <div>
        <div>
          <h1>{type ? "Log In" : "Sign Up"}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {!type && (
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="John"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="●●●●●●●"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>} {/* Show error message */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

AuthForm.propTypes = {
  type: PropTypes.bool,
};

export default AuthForm;
