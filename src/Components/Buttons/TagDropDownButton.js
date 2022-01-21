import styles from "../../Styles/TagDropDownButton.module.css";
import { ListItem } from "../UI/ListItem";

export const TagDropDownButton = ({
  title,
  elementRef,
  isOpen,
  onClick,
  data,
  deletionHandler,
  fullText,
}) => {
  function textLabel(obj) {
    const label = `${fullText.slice(obj.start, obj.end + 1)}`;
    if (label.length > 15) {
      return `${label.slice(0, 8)}...${label.slice(-4)}`;
    } else {
      return `${label.slice(0)}`;
    }
  }

  return (
    <div
      ref={elementRef}
      className={`${styles.tagdropdown} ${isOpen && styles.active}`}
    >
      <button className={styles.tagTitle} onClick={onClick}>
        {title}
      </button>

      <ul className={styles.menu}>
        {data === undefined
          ? ""
          : data.map((obj, i) => {
              return (
                <ListItem
                  text={textLabel(obj)}
                  onTagClick={() => {}}
                  onDeleteClick={() => deletionHandler(i, title)}
                  index={i}
                  key={` ${i} `}
                />
              );
            })}
      </ul>
    </div>
  );
};
