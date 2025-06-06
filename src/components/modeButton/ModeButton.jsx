import { useContext, useEffect } from "react";
import styles from "./ModeButton.module.css";
import ModeContext from "../../contexts/PageModeContext";

const ModeButton = () => {
  const { mode, setMode } = useContext(ModeContext);

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    document.querySelector(":root").classList.toggle("dark", mode === "dark");
    document.querySelector(":root").classList.toggle("light", mode === "light");
  }, [mode]);

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
    localStorage.setItem("mode", mode === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`${styles.container} ${mode === "dark" ? styles.dark : ""}`}
      onClick={handleClick}
    >
      <div className={styles.decor}>
        <LightDecor active={mode === "light"} />
        <DarkDecor active={mode === "dark"} />
      </div>
      <div className={styles.toggle}></div>
    </div>
  );
};

export default ModeButton;

const LightDecor = ({ active }) => (
  <div className={`${styles.lightDecor} ${!active && styles.inactive}`}>
    <svg
      style={{ position: "absolute", left: "0.5rem", top: "0.25rem" }}
      width="50"
      height="30"
      viewBox="100 80 250 100"
    >
      <circle cx="150" cy="150" r="40" />
      <circle cx="180" cy="130" r="40" />
      <circle cx="180" cy="150" r="35" />
      <circle cx="220" cy="150" r="40" />
    </svg>
    <svg
      style={{ position: "absolute", left: "2rem", top: "1.15rem" }}
      width="50"
      height="30"
      viewBox="100 80 250 100"
    >
      <circle cx="150" cy="150" r="40" />
      <circle cx="180" cy="130" r="40" />
      <circle cx="180" cy="150" r="35" />
      <circle cx="220" cy="150" r="40" />
    </svg>
  </div>
);

const DarkDecor = ({ active }) => (
  <div className={`${!active && styles.inactive} ${styles.darkDecor}`}>
    <svg
      style={{ position: "absolute", right: "0rem", top: "0.25rem" }}
      width="75"
      height="50"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <g transform="translate(10, 35)">
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(90)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(45)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(135)" />
        <rect x={-10} y={-1} width={20} height={3} />
      </g>
      <g transform="translate(35, 25)">
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(90)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(45)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(135)" />
        <rect x={-10} y={-1} width={20} height={3} />
      </g>
      <g transform="translate(35, 55)">
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(90)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(45)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(135)" />
        <rect x={-10} y={-1} width={20} height={3} />
      </g>
      <g transform="translate(60, 45)">
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(90)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(45)" />
        <rect x={-10} y={-1} width={20} height={3} transform="rotate(135)" />
        <rect x={-10} y={-1} width={20} height={3} />
      </g>
    </svg>
  </div>
);
