
import './App.css'
import Scene from './component/scene'
import React, { useState } from "react";

function calculate(expression) {
  let numStack = [];
  let opStack = [];

  const priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };

  const applyOp = () => {
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    let result = 0;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      case "^":
        result = Math.pow(a, b);
        break;
      default:
        break;
    }
    numStack.push(result);
  };

  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];
    if (/\d/.test(c)) {
      let num = "";
      while (i < expression.length && /\d|\./.test(expression[i])) {
        num += expression[i++];
      }
      i--;
      numStack.push(parseFloat(num));
    } else if (/[+\-*/^]/.test(c)) {
      while (
        opStack.length > 0 &&
        priority[opStack[opStack.length - 1]] >= priority[c]
      ) {
        applyOp();
      }
      opStack.push(c);
    }
  }
  while (opStack.length > 0) {
    applyOp();
  }
  return numStack.pop();
}

function App() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleKeyDown = (e) => {
    setResult("");
    const key = e.key;
    console.log(key)
    if ((/\d|\./).test(key)) {
      setInput(input + key);
    } else if (/[+\-*/^]/.test(key)) {
      setInput(input + ` ${key} `);
    } else if (key === "Enter") {
      setInput("");
      setResult(calculate(input));;
    } else if (key === "Backspace") {
      setInput(input.slice(0, -1));
    } else if (key === "Escape") {
      setInput("");
      setResult("");
    }
  };

  
  return (
    <>
       <div className="app" onKeyDown={handleKeyDown} tabIndex="0">
        <Scene />
        <div>
          <span className="a input">{input}</span>
          <span className="a result">{result}</span>
        </div>
      </div>
    </>
  )
}

export default App
