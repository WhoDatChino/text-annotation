import { useRef } from "react";
import styles from "../../Styles/ToggleButton.module.css";

export const ToggleButton = ({ text, onToggle, active }) => {
  const toggleRef = useRef();

  return (
    <button
      ref={toggleRef}
      className={`${styles.toggle} ${active && styles.active}`}
      onClick={onToggle}
    >
      {text}
    </button>
  );
};
