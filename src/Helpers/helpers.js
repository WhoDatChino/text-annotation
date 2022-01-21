export const createAnnotationObj = (textIn) => {
  return {
    text: textIn,
    tags: { Person: [], Organization: [], Place: [], Event: [] },
  };
};

export const createTags = (checkedArr, positions) => {
  const arr = checkedArr.map((bool, i) => {
    if (bool) {
      return {
        start: positions.startIndex,
        end: positions.endIndex,
      };
    } else {
      return null;
    }
  });
  return arr;
};
