import { useState, useEffect, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

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
      return { ...state, currentGuess: (state.currentGuess += action.payload) };
    case "DELETE_LETTER":
      console.log("delete");
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    case "ENTER_WORD":
      console.log("enter");
      return;
    default:
      throw new Error();
  }
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

  return <></>;
}

export default App;
