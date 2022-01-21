import styles from "../../Styles/ModalWindow.module.css";

import { useRef } from "react";

import { CancelButton } from "../Buttons/CancelButton";
import { ConfirmButton } from "../Buttons/ConfirmButton";

export const ModalWindow = ({ closeModalHandler, submitHandler }) => {
  const newTextRef = useRef();

  return (
    <div className={styles.container}>
      <header className={styles.modalHeader}>
        <h2 style={{ margin: "0 auto" }}>
          Please enter the text you would like to annotate:
        </h2>
      </header>
      <div className={styles.formContainer}>
        <form onSubmit={(e) => submitHandler(e, newTextRef.current.value)}>
          <textarea ref={newTextRef} cols={65} rows={10}></textarea>
          <div className={styles.btnContainer}>
            <CancelButton onClick={closeModalHandler} />
            <ConfirmButton />
          </div>
        </form>
      </div>
    </div>
  );
};
