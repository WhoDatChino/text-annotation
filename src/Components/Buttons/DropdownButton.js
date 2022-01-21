import styles from "../../Styles/DropdownButton.module.css";
import { ListItem } from "../UI/ListItem";

export const DropdownButton = ({
  title,
  invert = false,
  elementRef,
  isOpen,
  onClick,
  data,
  deletionHandler,
  changeCurrentTextHandler,
}) => {
  return (
    <div
      ref={elementRef}
      className={`${styles.dropdown} ${isOpen && styles.active}`}
    >
      <button className={styles.titleBtn} onClick={onClick}>
        {title}
      </button>

      <ul className={styles.menu}>
        {data.map((obj, i) => {
          return (
            <ListItem
              text={`${obj.text.slice(0, 18)}...`}
              onTagClick={changeCurrentTextHandler}
              onDeleteClick={deletionHandler}
              index={i}
              key={`${obj.text.slice(0, 10)} ${i} `}
            />
          );
        })}
      </ul>
    </div>
  );
};
