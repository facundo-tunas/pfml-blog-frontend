import { useState } from "react";
import styles from "./Auth.module.css";
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
        let errorData;
        if (response.status === 401) {
          errorData = await response.text();
        } else {
          errorData = "An error occurred.";
        }
        throw new Error(errorData);
      }

      const data = await response.json();

      if (type) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      setError(err.message); // Set the error message in your component state
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h2>{type ? "Log In" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!type && (
              <div className={styles.item}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id={styles.username}
                  name="username"
                  placeholder="John"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className={styles.item}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id={styles.email}
                name="email"
                placeholder="example@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.item}>
              <label
                htmlFor="password"
                id={styles.passwordLabel}
                className={type ? styles.hideAfter : ""}
              >
                Password
              </label>
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
            {error && <p className={styles.error}>{error}</p>}{" "}
            {/* Show error message */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <a className={styles.back} href="/">
        Back
      </a>
    </main>
  );
};

AuthForm.propTypes = {
  type: PropTypes.bool,
};

export default AuthForm;
