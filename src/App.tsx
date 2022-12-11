import React, {ReactElement, useState} from 'react';
import './App.css';

function App() {
  const guessArray = ["", "", "", "", ""]
  const [letters, setLetters] = useState(guessArray)
  const [keyDown, setKeyDown] = useState(false)

  function isALetterCode(letter: number) {
    return letter >= 65 && letter <= 90;
  }

  function isBackspace(inputCharCode: number) {
    return inputCharCode === 8;
  }

  function checkInput(event: any, inputIndex: number) {
    event.preventDefault();
    if (!keyDown) {
      console.log("key was not already down")
      setKeyDown(true)
      console.log("key is now down")
      const inputLetter = event.keyCode;
      let updatedLetters = [...letters]
      if (isALetterCode(inputLetter)) {
        updatedLetters[inputIndex] = String.fromCharCode(inputLetter).toUpperCase();
        setLetters(updatedLetters)
      } else if (isBackspace(inputLetter)) {
        updatedLetters[inputIndex] = "";
        setLetters(updatedLetters);
      }
    }
  }

  function changeFocus(event: any, inputIndex: number) {
    if (keyDown) {
      event.preventDefault();
      const inputLetterCode = event.keyCode;
      if (isALetterCode(inputLetterCode)) {
        let nextInput = document.getElementById("letterInput-" + (inputIndex + 1));
        nextInput?.focus()
      } else if (isBackspace(inputLetterCode)) {
        document.getElementById("letterInput-" + (inputIndex - 1))?.focus()
      }
      setKeyDown(false)
    }
  }

  function getInputBoxes() {
    let inputBoxes: ReactElement[] = [];
    guessArray.forEach((letter: string, index: number) => {
      inputBoxes.push(
          <input
              autoFocus={index === 0}
              id={"letterInput-" + index}
              key={index}
              type={"text"}
              className={"letter-input"}
              onKeyDown={(event: any) => checkInput(event, index)}
              onKeyUp={(event: any) => changeFocus(event, index)}
              maxLength={1}
              defaultValue={letters[index]}
          />)
    })
    return inputBoxes
  }

  return (
      <div className="App">
        <div>
          {getInputBoxes()}
        </div>
      </div>
  );

}

export default App;
