import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Calculator = () => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Fonction pour gérer les clics sur les touches numériques
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  // Fonction pour gérer la décimale
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Fonction pour gérer les opérateurs
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // Fonction pour effectuer le calcul
  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }
    
    return inputValue;
  };

  // Fonction pour calculer le résultat final (=)
  const calculateResult = () => {
    if (!operator || firstOperand === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = performCalculation();
    
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // Fonction pour réinitialiser la calculatrice
  const resetCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // Fonction pour changer le signe
  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  // Fonction pour calculer le pourcentage
  const calculatePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };

  // Disposition des boutons de la calculatrice
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