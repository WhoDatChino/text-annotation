import styles from "../../Styles/BlurModal.module.css";

export const BlurModal = ({ children, clickHandler }) => {
  return (
    <div onClick={clickHandler} className={styles.modal}>
      <div>{children}</div>
    </div>
  );
};
