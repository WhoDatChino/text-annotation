import styles from "../../Styles/CancelButton.module.css";
import { CrossIcon } from "../../SVG components/CrossIcon";

export const CancelButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.cancelBtn}>
      <div className={styles.checkboxCancel}>
        <CrossIcon />
      </div>
      <div className={styles.labelCancel}>Cancel</div>
    </button>
  );
};
