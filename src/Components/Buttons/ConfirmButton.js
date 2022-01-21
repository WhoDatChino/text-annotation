import styles from "../../Styles/ConfirmButton.module.css";

import { TickIcon } from "../../SVG components/TickIcon";

export const ConfirmButton = ({ props }) => {
  return (
    <button className={styles.btn} type="submit">
      <div className={styles.checkbox}>
        <TickIcon />
      </div>
      <div className={styles.label}>Confirm</div>
    </button>
  );
};
