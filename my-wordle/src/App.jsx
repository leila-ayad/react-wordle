import { useState, useEffect, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Row from "./Row.jsx";

const initialState = {
  answer: "nakul",
  currentTry: 0,
  guesses: [],
  currentGuess: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_LETTER":
      console.log("add");
      if (state.currentGuess.length < 5) {
        return { ...state, currentGuess: state.currentGuess + action.payload };
      } else {
        return state;
      }
    case "DELETE_LETTER":
      console.log("delete");
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    case "ENTER_WORD":
      if (state.currentGuess.length === 5) {
        return {
          ...state,
          currentTry: state.currentTry + 1,
          guesses: [...state.guesses, state.currentGuess],
          currentGuess: "",
        };
      } else {
        console.log("current guess must be 5 letters");
        return state;
      }
    default:
      throw new Error();
  }
}

function checkGuess(guess, answer) {
  let results = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      results.push("correct");
    } else if (answer.includes(guess[i])) {
      results.push("present");
    } else {
      results.push("absent");
    }
  }
  return results;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function startTyping(e) {
    console.log(e.key);
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      dispatch({ type: "ADD_LETTER", payload: e.key });
    } else if (e.key === "Backspace") {
      dispatch({ type: "DELETE_LETTER" });
    } else if (e.key === "Enter") {
      dispatch({ type: "ENTER_WORD" });
    }
  }

  useEffect(() => {
    let setupListener = document.addEventListener("keydown", (e) =>
      startTyping(e),
    );

    return () => {
      document.removeEventListener("click", setupListener);
    };
  }, []);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <div className="wordle">
      <h1>REACT WORDLE</h1>
      {Array.from({ length: 6 }).map((_, i) => {
        if (i < state.currentTry) {
          let letterStates = checkGuess(state.guesses[i], state.answer);
          console.log(letterStates);
          return (
            <Row
              key={i}
              word={state.guesses[i]}
              letterStates={letterStates}
            ></Row>
          );
        } else if (i === state.currentTry) {
          return <Row key={i} word={state.currentGuess}></Row>;
        } else if (i > state.currentTry) {
          return <Row key={i}></Row>;
        }
      })}
    </div>
  );
}

export default App;
