import { useRef } from "react";
import styles from "../../Styles/ListItem.module.css";
import { CrossIcon } from "../../SVG components/CrossIcon";

export const ListItem = ({ text, onTagClick, onDeleteClick, index }) => {
  const elementRef = useRef();

  return (
    <li ref={elementRef} data-index={index}>
      <div className={styles.listItem}>
        <div
          onClick={() => onTagClick(elementRef.current.dataset.index)}
          className={styles.textContainer}
        >
          <p>{text}</p>
        </div>
        <button
          className={styles.deleteBtn}
          onClick={() => onDeleteClick(elementRef.current.dataset.index)}
        >
          <CrossIcon colour={`rgb(123,44,191)`} />
        </button>
      </div>
    </li>
  );
};
