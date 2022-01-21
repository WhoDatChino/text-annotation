import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BlurModal } from "./Components/Modal/BlurModal";
import { ModalWindow } from "./Components/Modal/ModalWindow";
import { createAnnotationObj, createTags } from "./Helpers/helpers";
import { DropdownButton } from "./Components/Buttons/DropdownButton";
import { ToggleButton } from "./Components/Buttons/ToggleButton";
import { AddTextButton } from "./Components/Buttons/AddTextButton";
import { useClickOutside } from "./Hooks/useClickOutside";
import { TagSelector } from "./Components/UI/TagSelector";
import { TagDropDownButton } from "./Components/Buttons/TagDropDownButton";

function App() {
  const [wordSelection, setWordSelection] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [currentText, setCurrentText] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [personIsOpen, setPersonIsOpen] = useState(false);
  const [orgIsOpen, setOrgIsOpen] = useState(false);
  const [placeIsOpen, setplaceIsOpen] = useState(false);
  const [eventIsOpen, setEventIsOpen] = useState(false);
  const [autoSelect, setAutoSelect] = useState(false);
  const [showTagSelector, setShowTagSelector] = useState(false);

  const data = useRef([
    {
      text: `Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services. Its best-known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 21 in the 2020 Fortune 500 rankings of the largest United States corporations by total revenue;[3] it was the world's largest software maker by revenue as of 2016.[4] It is considered one of the Big Five companies in the U.S. information technology industry, along with Amazon, Alphabet (Google), Apple, and Meta (Facebook).

      Microsoft (the word being a portmanteau of "microcomputer software"[5]) was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800. It rose to dominate the personal computer operating system market with MS-DOS in the mid-1980s, followed by Microsoft Windows. The company's 1986 initial public offering (IPO), and subsequent rise in its share price, created three billionaires and an estimated 12,000 millionaires among Microsoft employees. Since the 1990s, it has increasingly diversified from the operating system market and has made a number of corporate acquisitions, their largest being the acquisition of LinkedIn for $26.2 billion in December 2016,[6] followed by their acquisition of Skype Technologies for $8.5 billion in May 2011.[7]
      
      As of 2015, Microsoft is market-dominant in the IBM PC compatible operating system market and the office software suite market, although it has lost the majority of the overall operating system market to Android.[8] The company also produces a wide range of other consumer and enterprise software for desktops, laptops, tabs, gadgets, and servers, including Internet search (with Bing), the digital services market (through MSN), mixed reality (HoloLens), cloud computing (Azure), and software development (Visual Studio).`,
      tags: { Person: [], Organization: [], Place: [], Event: [] },
    },
    {
      text: `Spider-Man is a superhero appearing in American comic books published by Marvel Comics. Created by writer-editor Stan Lee and artist Steve Ditko, he first appeared in the anthology comic book Amazing Fantasy #15 (August 1962) in the Silver Age of Comic Books. He has since been featured in movies, television shows, video games, and plays. Spider-Man is the alias of Peter Parker, an orphan raised by his Aunt May and Uncle Ben in New York City after his parents Richard and Mary Parker died in a plane crash.`,
      tags: { Person: [], Organization: [], Place: [], Event: [] },
    },
    {
      text: `NASA scientists say that the eruption of a submarine volcano in Tonga is helping them to understand how features formed on the surfaces of Mars and Venus.`,
      tags: { Person: [], Organization: [], Place: [], Event: [] },
    },
  ]);

  // UseEffect hooks for localStorage data extartion & storage
  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      data.current = JSON.parse(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data.current));
  });

  let elementRef = useClickOutside(() => {
    setIsOpen(false);
  });

  // Keeps track of the current annotation in the data arr
  let currentTextIndex = useRef();

  function getManualTextIndexs() {
    if (!document.getSelection()) return;
    const selection = document.getSelection();
    let startIndex = selection.anchorOffset;
    let endIndex = selection.focusOffset;

    if (endIndex < startIndex) {
      const temp = endIndex;
      endIndex = startIndex;
      startIndex = temp;
    }

    return { startIndex, endIndex };
  }

  function getTextSelection() {
    const selection = document.getSelection();

    const positions = getManualTextIndexs();

    setShowTagSelector(true);

    const autoCompleteIndexes = autoCompleteSelection(positions);
    const start = autoCompleteIndexes.startIndex;
    const end = autoCompleteIndexes.endIndex;

    if (autoSelect) {
      setWordSelection(currentText.slice(start, end + 1));
      return { start, end };
    } else {
      setWordSelection(selection.toString());
      return { positions };
    }
  }

  // Need start & end index pos of selection
  // Check through currentAnnotation to see if annotation already exists => if so, check correct boxes
  // Allow user to check/uncheck boxes
  // Determine which checkboxes have been filled
  // Create new annotation

  function autoCompleteSelection({ startIndex, endIndex }) {
    let start;
    let end;

    for (let i = startIndex; i >= 0; i--) {
      if (i === 0) {
        start = 0;
        break;
      }
      if (currentText[i] === " ") {
        start = i + 1;
        break;
      }
    }

    // endIndex-1 because focusOffset is 1 value too high
    for (let j = endIndex - 1; j < currentText.length; j++) {
      if (j === currentText.length - 1) {
        end = j;
        break;
      }
      if (currentText[j] === " ") {
        end = j - 1;
        break;
      }
    }
    // console.log(`POS 10:'${currentText[10]}'`);
    return { startIndex: start, endIndex: end };
  }

  function createNewAnnotation(e, textIn) {
    e.preventDefault();

    if (textIn.trim() === "") {
      textIn = "";
      return;
    }

    const dataArr = data.current;

    // Add new Annotation obj, hide modal & change currentText
    setShowTextInput(false);
    const newAnno = createAnnotationObj(textIn);
    data.current = [...dataArr, newAnno];
    setCurrentText(data.current[data.current.length - 1].text);
    currentTextIndex.current = data.current.length - 1;
  }

  // Deletes full text and tags obj
  function deleteText(index) {
    data.current = data.current.filter((_, i) => i !== +index);

    if (data.current.length === 0) {
      setCurrentText("");
      setIsOpen(false);
      currentTextIndex.current = null;
    } else {
      setCurrentText(data.current[0].text);
      setIsOpen(false);
      currentTextIndex.current = 0;
    }

    setShowTagSelector(false);
  }
  function deleteTag(index, category) {
    data.current[currentTextIndex.current].tags[category] = data.current[
      currentTextIndex.current
    ].tags[category].filter((_, i) => i !== +index);

    setPersonIsOpen(false);
    setOrgIsOpen(false);
    setplaceIsOpen(false);
    setEventIsOpen(false);
  }

  function enterTagInfo(checkedArr) {
    const indexes = getManualTextIndexs();
    if (autoSelect) {
      const pos = autoCompleteSelection(indexes);
      const positionDataArr = createTags(checkedArr, pos);
      addTagsToData(
        Object.keys(data.current[currentTextIndex.current].tags),
        positionDataArr
      );
    } else {
      const positionDataArr = createTags(checkedArr, indexes);
      addTagsToData(
        Object.keys(data.current[currentTextIndex.current].tags),
        positionDataArr
      );
    }
  }
  function addTagsToData(checkedArr, tagsArr) {
    checkedArr.forEach((tag, i) => {
      if (tagsArr[i]) {
        data.current[currentTextIndex.current].tags[tag].push(tagsArr[i]);
        console.log(data.current[currentTextIndex.current].tags);
        setShowTagSelector(false);
      }
    });
  }

  return (
    <main>
      <header>
        <h1>Annotate Text With Tags - Priberam</h1>
      </header>
      <nav style={{ display: "flex" }}>
        <div className="interactions-container">
          <h3>Interactions:</h3>
          <AddTextButton onClick={() => setShowTextInput(true)}>
            Add Text
          </AddTextButton>

          <DropdownButton
            title={`Select Text`}
            elementRef={elementRef}
            isOpen={isOpen}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            data={data.current}
            deletionHandler={deleteText}
            changeCurrentTextHandler={(i) => {
              setCurrentText(data.current[i].text);
              currentTextIndex.current = i;
              setShowTagSelector(false);
            }}
          />

          <ToggleButton
            text={`Auto-select`}
            active={autoSelect}
            onToggle={() => setAutoSelect((prev) => !prev)}
          />
        </div>
        <div className="tags-container">
          <h3>Tags:</h3>
          <div>
            <TagDropDownButton
              title={"Person"}
              isOpen={personIsOpen}
              onClick={() => {
                setPersonIsOpen((prev) => !prev);
              }}
              data={data.current[currentTextIndex?.current]?.tags["Person"]}
              fullText={data.current[currentTextIndex?.current]?.text}
              deletionHandler={deleteTag}
            />
            <TagDropDownButton
              title={"Organization"}
              isOpen={orgIsOpen}
              onClick={() => {
                setOrgIsOpen((prev) => !prev);
              }}
              data={
                data.current[currentTextIndex?.current]?.tags["Organization"]
              }
              fullText={data.current[currentTextIndex?.current]?.text}
              deletionHandler={deleteTag}
            />
            <TagDropDownButton
              title={"Place"}
              isOpen={placeIsOpen}
              onClick={() => {
                setplaceIsOpen((prev) => !prev);
              }}
              data={data.current[currentTextIndex?.current]?.tags["Place"]}
              fullText={data.current[currentTextIndex?.current]?.text}
              deletionHandler={deleteTag}
            />
            <TagDropDownButton
              title={"Event"}
              isOpen={eventIsOpen}
              onClick={() => {
                setEventIsOpen((prev) => !prev);
              }}
              data={data.current[currentTextIndex?.current]?.tags["Event"]}
              fullText={data.current[currentTextIndex?.current]?.text}
              deletionHandler={deleteTag}
            />
          </div>
        </div>
      </nav>
      <h3 style={{ margin: "5px 12px" }}>Text:</h3>
      <div className="text-area">
        {!currentText && (
          <p style={{ pointerEvents: "none" }}>
            Select a text or add a new one!
          </p>
        )}
        <p onMouseUp={getTextSelection}>{currentText}</p>
      </div>
      {showTagSelector && (
        <TagSelector
          wordSelection={wordSelection}
          tagArr={Object.keys(data.current[currentTextIndex.current].tags)}
          newAnnotations={enterTagInfo}
        />
      )}

      {showTextInput && (
        <BlurModal>
          <ModalWindow
            closeModalHandler={() => setShowTextInput(false)}
            submitHandler={createNewAnnotation}
          />
        </BlurModal>
      )}
    </main>
  );
}

export default App;
