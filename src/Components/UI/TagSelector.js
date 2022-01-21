import styles from "../../Styles/TagSelector.module.css";

import { useRef, useState } from "react/cjs/react.development";
import { ConfirmButton } from "../Buttons/ConfirmButton";

export const TagSelector = ({ wordSelection, tagArr, newAnnotations }) => {
  const [isSelected, setIsSelected] = useState(new Array(4).fill(false));

  function onChangehandler(i) {
    const newIsSelected = isSelected.map((bool, index) =>
      index === i ? !bool : bool
    );

    setIsSelected(newIsSelected);
  }

  function submitHandler(e) {
    e.preventDefault();

    newAnnotations(isSelected);
  }
  return (
    <div className={styles.tagbox}>
      <h3>Selection:</h3>
      <div className={styles.wordbox}>
        <p>{wordSelection}</p>
      </div>
      <h3>Select Tags:</h3>
      <form onSubmit={submitHandler}>
        {tagArr.map((tag, i) => (
          <div key={tag}>
            <input
              onChange={() => onChangehandler(i)}
              checked={isSelected[i]}
              type="checkbox"
              name={tag}
              value={tag}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
        <ConfirmButton>Confirm</ConfirmButton>
      </form>
    </div>
  );
};
