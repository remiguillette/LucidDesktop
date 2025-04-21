import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [lastNumber, setLastNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const inputDigit = (digit) => {
    if (newNumber) {
      setDisplay(digit);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);
    if (lastNumber === null) {
      setLastNumber(inputValue);
    } else if (operation) {
      const result = performCalculation();
      setDisplay(String(result));
      setLastNumber(result);
    }
    setOperation(nextOperator);
    setNewNumber(true);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (operation === '+') {
      return lastNumber + inputValue;
    } else if (operation === '-') {
      return lastNumber - inputValue;
    } else if (operation === '*') {
      return lastNumber * inputValue;
    } else if (operation === '/') {
      return lastNumber / inputValue;
    }
    return inputValue;
  };

  const calculateResult = () => {
    if (!operation || lastNumber === null) {
      return;
    }
    const inputValue = parseFloat(display);
    const result = performCalculation();
    setDisplay(String(result));
    setLastNumber(result);
    setOperation(null);
    setNewNumber(true);
  };

  const resetCalculator = () => {
    setDisplay('0');
    setLastNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const calculatePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };

  const calculatorButtons = [
    { text: 'C', action: resetCalculator, className: 'calculator-button special' },
    { text: '+/-', action: toggleSign, className: 'calculator-button special' },
    { text: '%', action: calculatePercentage, className: 'calculator-button special' },
    { text: '÷', action: () => handleOperator('/'), className: 'calculator-button operator' },
    { text: '7', action: () => inputDigit('7'), className: 'calculator-button' },
    { text: '8', action: () => inputDigit('8'), className: 'calculator-button' },
    { text: '9', action: () => inputDigit('9'), className: 'calculator-button' },
    { text: '×', action: () => handleOperator('*'), className: 'calculator-button operator' },
    { text: '4', action: () => inputDigit('4'), className: 'calculator-button' },
    { text: '5', action: () => inputDigit('5'), className: 'calculator-button' },
    { text: '6', action: () => inputDigit('6'), className: 'calculator-button' },
    { text: '-', action: () => handleOperator('-'), className: 'calculator-button operator' },
    { text: '1', action: () => inputDigit('1'), className: 'calculator-button' },
    { text: '2', action: () => inputDigit('2'), className: 'calculator-button' },
    { text: '3', action: () => inputDigit('3'), className: 'calculator-button' },
    { text: '+', action: () => handleOperator('+'), className: 'calculator-button operator' },
    { text: '0', action: () => inputDigit('0'), className: 'calculator-button zero' },
    { text: '.', action: inputDecimal, className: 'calculator-button' },
    { text: '=', action: calculateResult, className: 'calculator-button operator' }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keypad">
        {calculatorButtons.map((button, index) => (
          <button
            key={index}
            className={button.className}
            onClick={button.action}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;