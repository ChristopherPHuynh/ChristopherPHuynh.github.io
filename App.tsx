/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, next: number, op: string) => {
    switch (op) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '*': return prev * next;
      case '/': return prev / next;
      default: return next;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    if (operator && prevValue !== null) {
      const newValue = calculate(prevValue, inputValue, operator);
      setDisplay(String(newValue));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-body">
        <div className="calculator-screen">
          <div className="lcd-text">{display}</div>
        </div>
        <div className="calculator-keys">
          <button onClick={clearAll} className="key-clear">AC</button>
          <button onClick={() => performOperation('/')} className="key-op">/</button>
          <button onClick={() => performOperation('*')} className="key-op">×</button>
          
          <button onClick={() => inputDigit('7')}>7</button>
          <button onClick={() => inputDigit('8')}>8</button>
          <button onClick={() => inputDigit('9')}>9</button>
          <button onClick={() => performOperation('-')} className="key-op">-</button>
          
          <button onClick={() => inputDigit('4')}>4</button>
          <button onClick={() => inputDigit('5')}>5</button>
          <button onClick={() => inputDigit('6')}>6</button>
          <button onClick={() => performOperation('+')} className="key-op">+</button>
          
          <button onClick={() => inputDigit('1')}>1</button>
          <button onClick={() => inputDigit('2')}>2</button>
          <button onClick={() => inputDigit('3')}>3</button>
          <button onClick={handleEqual} className="key-equal">=</button>
          
          <button onClick={() => inputDigit('0')} className="key-zero">0</button>
          <button onClick={inputDot}>.</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav>
        <a href="#home">Home</a> | <a href="#projects">Projects</a> | <a href="#calculator">Calculator</a>
      </nav>

      <hr />

      <section id="home">
        <h1>Christopher Huynh</h1>
        <p>PhD Student at Virginia Tech (VT)</p>
        
        <h2>About Me</h2>
        <p>
          Welcome to my personal website. I am a PhD student at Virginia Tech, 
          focusing on research in my field of study. My academic journey is 
          driven by a passion for discovery and innovation.
        </p>

        <h3>Education</h3>
        <ul>
          <li><strong>PhD in [Your Field]</strong>, Virginia Tech (In Progress)</li>
          <li><strong>[Previous Degree]</strong>, [Previous Institution]</li>
        </ul>

        <h3>Contact</h3>
        <p>Email: [Your Email Address]</p>
        <p>Office: [Your Office Location]</p>
      </section>

      <hr />

      <section id="calculator">
        <h2>Retro Calculator</h2>
        <p>A little tool for quick calculations.</p>
        <Calculator />
      </section>

      <hr />

      <section id="projects">
        <h2>Projects</h2>
        
        <h3>Project 1: [Project Title]</h3>
        <p>
          A brief description of the first project, its goals, and the 
          technologies or methodologies used.
        </p>

        <h3>Project 2: [Project Title]</h3>
        <p>
          A brief description of the second project, highlighting the 
          key findings or outcomes.
        </p>

        <h3>Project 3: [Project Title]</h3>
        <p>
          A brief description of the third project and its impact in 
          the academic or professional community.
        </p>
      </section>

      <hr />

      <footer>
        <p>&copy; 2024 Christopher Huynh</p>
      </footer>
    </div>
  );
}
