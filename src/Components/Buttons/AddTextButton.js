import styles from "../../Styles/AddTextButton.module.css";

export const AddTextButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.addText}>
      Add Text
    </button>
  );
};
