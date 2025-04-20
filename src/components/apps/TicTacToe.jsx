import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TicTacToe = () => {
  const { t } = useTranslation();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'draw', 'winner'
  
  // Vérifier s'il y a un gagnant
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  };
  
  // Gérer le clic sur une case
  const handleClick = (i) => {
    // Ne rien faire si le jeu est terminé ou si la case est déjà remplie
    if (gameStatus !== 'playing' || board[i]) {
      return;
    }
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    
    // Vérifier s'il y a un gagnant ou un match nul
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus('winner');
    } else if (newBoard.every(square => square !== null)) {
      setGameStatus('draw');
    }
  };
  
  // Réinitialiser le jeu
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('playing');
  };
  
  // Rendu de chaque case
  const renderSquare = (i) => {
    return (
      <button 
        className="tictactoe-square" 
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };
  
  // Message d'état du jeu
  const renderStatus = () => {
    if (gameStatus === 'winner') {
      const winner = calculateWinner(board);
      return (
        <div className="tictactoe-status winner">
          {t('apps.tictactoe.winner', { player: winner })}
        </div>
      );
    } else if (gameStatus === 'draw') {
      return (
        <div className="tictactoe-status draw">
          {t('apps.tictactoe.draw')}
        </div>
      );
    } else {
      return (
        <div className="tictactoe-status">
          {t('apps.tictactoe.nextPlayer', { player: xIsNext ? 'X' : 'O' })}
        </div>
      );
    }
  };
  
  return (
    <div className="tictactoe-container">
      <div className="tictactoe-header">
        <h3>{t('apps.tictactoe.title')}</h3>
        <button 
          className="tictactoe-reset-button"
          onClick={resetGame}
        >
          {t('apps.tictactoe.newGame')}
        </button>
      </div>
      
      {renderStatus()}
      
      <div className="tictactoe-board">
        <div className="tictactoe-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="tictactoe-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="tictactoe-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;