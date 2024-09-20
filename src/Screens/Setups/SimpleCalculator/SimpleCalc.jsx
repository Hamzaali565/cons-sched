import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../../Components/Header/Header";

const SimpleCalc = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        let inputToEvaluate = input
          .replace(/^[+*/%]*0*/, "")
          .replace(/[+*/%]+$/, "");
        const parts = inputToEvaluate.split(/([+\-*/%])/);
        const processedParts = [];
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i % 2 === 0) {
            const numericPart = Number(part);
            if (!isNaN(numericPart)) {
              processedParts.push(numericPart.toString());
            }
          } else {
            processedParts.push(part);
          }
        }
        const newJointString = processedParts.join("");
        const result = eval(newJointString);
        setInput(result.toString());
        setOutput(result);
      } catch (error) {
        setInput("Error");
        setOutput("");
      }
    } else if (value === "C") {
      setInput("");
      setOutput("");
    } else if (value === "<-") {
      setInput(input.slice(0, -1));
    } else {
      if (input === "" && (value === "*" || value === "/")) return;
      if (isOperator(value)) {
        if (isOperator(input.charAt(input.length - 1))) return;
      }
      setInput((prevInput) => prevInput + value);
    }
  };

  const isOperator = (char) => {
    const operators = ["+", "-", "*", "/", "%"];
    return operators.includes(char);
  };

  const handleKeyDown = (event) => {
    const keyPressed = event.key;
    const validKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      ".",
      "%",
    ];
    if (keyPressed === "Enter") {
      event.preventDefault();
      handleButtonClick("=");
    } else if (keyPressed === "Backspace") {
      event.preventDefault();
      handleButtonClick("<-");
    } else if (validKeys.includes(keyPressed)) {
      event.preventDefault();
      handleButtonClick(keyPressed);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <div>
      <Header inpShow={false} />
      <div className="body">
        <div className="calculator">
          <div className="container">
            <div className="inputForm">
              <input className="input" type="text" value={input} readOnly />
            </div>
            <div className="Buttons">
              <button onClick={() => handleButtonClick("C")}>C</button>
              <button onClick={() => handleButtonClick("%")}>%</button>
              <button onClick={() => handleButtonClick("=")}>=</button>
              <button onClick={() => handleButtonClick("/")}>/</button>

              <button onClick={() => handleButtonClick("7")}>7</button>
              <button onClick={() => handleButtonClick("8")}>8</button>
              <button onClick={() => handleButtonClick("9")}>9</button>
              <button onClick={() => handleButtonClick("*")}>*</button>

              <button onClick={() => handleButtonClick("4")}>4</button>
              <button onClick={() => handleButtonClick("5")}>5</button>
              <button onClick={() => handleButtonClick("6")}>6</button>
              <button onClick={() => handleButtonClick("-")}>-</button>

              <button onClick={() => handleButtonClick("1")}>1</button>
              <button onClick={() => handleButtonClick("2")}>2</button>
              <button onClick={() => handleButtonClick("3")}>3</button>
              <button onClick={() => handleButtonClick("+")}>+</button>

              <button onClick={() => handleButtonClick("0")}>0</button>
              <button onClick={() => handleButtonClick("00")}>00</button>
              <button onClick={() => handleButtonClick(".")}>.</button>
              <button onClick={() => handleButtonClick("<-")}>x</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCalc;
