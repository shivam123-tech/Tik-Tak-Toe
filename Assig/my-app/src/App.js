import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

const GamePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <button className={`square ${board[index]}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
  ? winner === 'X' 
    ? 'First Player Win'
    : 'Second Player Win'
  : board.every((square) => square) 
  ? 'Match Draw'
  : `Next player: ${xIsNext ? 'First Player Turn' : 'Second Player Turn'}`;


  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const InstructionPage = () => (
  <div className="instructions">
    <h2>Instructions:</h2>
    <p>1. The game is played on a 3x3 grid.</p>
    <p>2. Players take turns to click on a square to place their symbol ('X' or 'O').</p>
    <p>3. The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins.</p>
    <p>4. If all squares are filled and no player has three in a row, it's a draw.</p>
    <p>5. Have fun and enjoy the game!</p>
    <Link to="/game"><div className='continuebutton'>Continue to Game</div></Link>
  </div>
);

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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstructionPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
