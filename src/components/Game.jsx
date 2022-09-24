import React, { useState, useRef } from "react";
import Board from "./Board";

export default function Game() {
  const boardRef = useRef(null);

  const [gridSize, setGridSize] = useState(10);
  const [seed, setSeed] = useState(4);
  const [board, setBoard] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false))
  );
  const [generetion, setGeneretion] = useState(0);

  function seedArr(arr) {
    const newArr = [...arr];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        newArr[i][j] = false;
        if (Math.floor(Math.random() * 10) < seed) {
          newArr[i][j] = true;
        }
      }
    }
    setBoard(newArr);
  }

  function isAlive(x, y) {
    return board[x][y];
  }

  function setAlive(x, y) {
    const newBoard = board.slice();
    newBoard[x][y] = !newBoard[x][y];
    setBoard(newBoard);
  }

  function aliveNeighbors(row, col) {
    let count = 0;
    if (row - 1 >= 0) {
      if (board[row - 1][col] === true) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (board[row - 1][col - 1] === true) count++;
    }
    if (row - 1 >= 0 && col + 1 < gridSize) {
      if (board[row - 1][col + 1] === true) count++;
    }
    if (col - 1 >= 0) {
      if (board[row][col - 1] === true) count++;
    }
    if (col + 1 < gridSize) {
      if (board[row][col + 1] === true) count++;
    }
    if (row + 1 < gridSize) {
      if (board[row + 1][col] === true) count++;
    }
    if (row + 1 < gridSize && col - 1 >= 0) {
      if (board[row + 1][col - 1] === true) count++;
    }
    if (row + 1 < gridSize && col + 1 < gridSize) {
      if (board[row + 1][col + 1] === true) count++;
    }
    return count;
  }

  function handlePlay() {
    let newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let neighbors = aliveNeighbors(i, j);
        if (isAlive(i, j)) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][j] = false;
          } else {
            newGrid[i][j] = true;
          }
          //cell is dead
        } else {
          if (neighbors === 3) {
            newGrid[i][j] = true;
          }
        }
      }
    }
    setBoard(newGrid);
    setGeneretion(generetion + 1);
  }

  return (
    <div className="game-div" ref={boardRef}>
      <h1>game</h1>
      <h2>generetion:{generetion} </h2>

      <button className="btn play-btn" onClick={() => seedArr(board)}>
        seed
      </button>
      <button className="btn seed-btn" onClick={() => handlePlay()}>
        play
      </button>
      <button
        className="btn log-btn"
        onClick={() => {
          console.log(board);
        }}
      >
        log board
      </button>
      <Board
        board={board}
        size={gridSize}
        isAlive={isAlive}
        setAlive={setAlive}
        aliveNeighbors={aliveNeighbors}
      ></Board>
    </div>
  );
}
