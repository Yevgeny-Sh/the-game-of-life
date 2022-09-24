import React, { useState, useEffect, useRef, useCallback } from "react";
import Board from "./Board";

export default function Game() {
  const boardRef = useRef(null);
  const interval = useRef(null);

  const [speed, setSpeed] = useState(1000);
  const [isPlaying, setPlaying] = useState(false);

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

  // function isAlive(x, y) {
  //   return board[x][y];
  // }

  function setAlive(x, y) {
    const newBoard = board.slice();
    newBoard[x][y] = !newBoard[x][y];
    setBoard(newBoard);
  }

  // function aliveNeighbors(row, col) {
  //   let count = 0;
  //   if (row - 1 >= 0) {
  //     if (board[row - 1][col] === true) count++;
  //   }
  //   if (row - 1 >= 0 && col - 1 >= 0) {
  //     if (board[row - 1][col - 1] === true) count++;
  //   }
  //   if (row - 1 >= 0 && col + 1 < gridSize) {
  //     if (board[row - 1][col + 1] === true) count++;
  //   }
  //   if (col - 1 >= 0) {
  //     if (board[row][col - 1] === true) count++;
  //   }
  //   if (col + 1 < gridSize) {
  //     if (board[row][col + 1] === true) count++;
  //   }
  //   if (row + 1 < gridSize) {
  //     if (board[row + 1][col] === true) count++;
  //   }
  //   if (row + 1 < gridSize && col - 1 >= 0) {
  //     if (board[row + 1][col - 1] === true) count++;
  //   }
  //   if (row + 1 < gridSize && col + 1 < gridSize) {
  //     if (board[row + 1][col + 1] === true) count++;
  //   }
  //   return count;
  // }

  // function handlePlay() {
  //   console.log("in handle play");
  //   let newGrid = Array(gridSize)
  //     .fill()
  //     .map(() => Array(gridSize).fill(false));
  //   for (let i = 0; i < gridSize; i++) {
  //     for (let j = 0; j < gridSize; j++) {
  //       let neighbors = aliveNeighbors(i, j);
  //       if (isAlive(i, j)) {
  //         if (neighbors < 2 || neighbors > 3) {
  //           newGrid[i][j] = false;
  //         } else {
  //           newGrid[i][j] = true;
  //         }
  //         //cell is dead
  //       } else {
  //         if (neighbors === 3) {
  //           newGrid[i][j] = true;
  //         }
  //       }
  //     }
  //   }

  //   setGeneretion((prevGen) => prevGen + 1);
  //   setBoard(newGrid);
  // }

  const isAlive = useCallback(
    (x, y) => {
      return board[x][y];
    },
    [board]
  );

  const aliveNeighbors = useCallback(
    (row, col) => {
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
    },
    [board, gridSize]
  );

  const x = useCallback(() => {
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

    setGeneretion((prevGen) => prevGen + 1);
    setBoard(newGrid);
  }, [aliveNeighbors, gridSize, isAlive]);

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        x();
      }, speed);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPlaying, board, speed, x]);

  // function resizeBoard(size) {
  //   setGridSize(size);
  //   let newSizeArr = Array(size)
  //     .fill()
  //     .map(() => Array(gridSize).fill(false));
  //   setBoard(newSizeArr);
  // }

  return (
    <div className="game-div" ref={boardRef}>
      <h1>game</h1>
      <h2>generetion:{generetion} </h2>

      {/* <h4>change grid size</h4>
      <input
        type="range"
        min="1"
        max="30"
        value={gridSize}
        onChange={(e) => resizeBoard(Number(e.target.value))}
      /> */}

      <h4>change seed size</h4>
      <input
        // id="reversedRange"
        type="range"
        min="1"
        max="10"
        value={seed}
        onChange={(e) => setSeed(Number(e.target.value))}
      />

      <h4>change game speed</h4>
      <input
        type="range"
        min="1"
        max="1000"
        id="reversedRange"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />

      <button className=" seed-btn" onClick={() => seedArr(board)}>
        seed
      </button>

      <button className=" play-btn" onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? "pause" : "play"}
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
