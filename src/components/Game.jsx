import React, { useState, useEffect, useRef, useCallback } from "react";
import Board from "./Board";

export default function Game() {
  const intervalRef = useRef(null);

  const [gameRules, setGameRules] = useState("connways");

  const [speed, setSpeed] = useState(500);
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

  function setAlive(x, y) {
    const newBoard = board.slice();
    newBoard[x][y] = !newBoard[x][y];
    setBoard(newBoard);
  }

  const isAlive = useCallback(
    (x, y) => {
      return board[x][y];
    },
    [board]
  );

  const aliveNeighbors = useCallback(
    (row, col) => {
      let count = 0;
      // check north square
      if (row - 1 >= 0) {
        if (board[row - 1][col] === true) count++;
      }
      //check north west square
      if (row - 1 >= 0 && col - 1 >= 0) {
        if (board[row - 1][col - 1] === true) count++;
      }
      //check north east square
      if (row - 1 >= 0 && col + 1 < gridSize) {
        if (board[row - 1][col + 1] === true) count++;
      }
      //check west square
      if (col - 1 >= 0) {
        if (board[row][col - 1] === true) count++;
      }
      //check east square
      if (col + 1 < gridSize) {
        if (board[row][col + 1] === true) count++;
      }
      // check south square
      if (row + 1 < gridSize) {
        if (board[row + 1][col] === true) count++;
      }
      //check south west square
      if (row + 1 < gridSize && col - 1 >= 0) {
        if (board[row + 1][col - 1] === true) count++;
      }
      //check south east square
      if (row + 1 < gridSize && col + 1 < gridSize) {
        if (board[row + 1][col + 1] === true) count++;
      }
      return count;
    },
    [board, gridSize]
  );

  const handleTurnConnwaysRules = useCallback(() => {
    let newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));
    for (let rows = 0; rows < gridSize; rows++) {
      for (let col = 0; col < gridSize; col++) {
        let neighbors = aliveNeighbors(rows, col);
        if (isAlive(rows, col)) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[rows][col] = false;
          } else {
            newGrid[rows][col] = true;
          }
          //if cell is dead
        } else {
          if (neighbors === 3) {
            newGrid[rows][col] = true;
          }
        }
      }
    }

    setGeneretion((prevGen) => prevGen + 1);
    setBoard(newGrid);
  }, [aliveNeighbors, gridSize, isAlive]);

  //diffrent game rules
  //hyper active life
  const handleTurnhyperActiveLifeRules = useCallback(() => {
    let newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));
    for (let rows = 0; rows < gridSize; rows++) {
      for (let col = 0; col < gridSize; col++) {
        let neighbors = aliveNeighbors(rows, col);
        if (isAlive(rows, col)) {
          if (neighbors < 2 || neighbors > 5) {
            newGrid[rows][col] = false;
          } else {
            newGrid[rows][col] = true;
          }
          //if cell is dead
        } else {
          if (neighbors === 3) {
            newGrid[rows][col] = true;
          }
        }
      }
    }

    setGeneretion((prevGen) => prevGen + 1);
    setBoard(newGrid);
  }, [aliveNeighbors, gridSize, isAlive]);

  //Spontaneous rules
  const handleTurndSpontaneous = useCallback(() => {
    let newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));
    for (let rows = 0; rows < gridSize; rows++) {
      for (let col = 0; col < gridSize; col++) {
        let neighbors = aliveNeighbors(rows, col);
        if (isAlive(rows, col)) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[rows][col] = false;
          } else {
            newGrid[rows][col] = true;
          }
          //if cell is dead
        } else {
          if (neighbors === 3) {
            newGrid[rows][col] = true;
          } else {
            //0.5 chance to spontaneously revive a dead cell
            if (Math.floor(Math.random() * 10) > 4) {
              newGrid[rows][col] = true;
            }
          }
        }
      }
    }
    setGeneretion((prevGen) => prevGen + 1);
    setBoard(newGrid);
  }, [aliveNeighbors, gridSize, isAlive]);

  //stable state rules
  const handleTurnStableStateRules = useCallback(() => {
    let newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));

    const emptyGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false));

    for (let rows = 0; rows < gridSize; rows++) {
      for (let col = 0; col < gridSize; col++) {
        let neighbors = aliveNeighbors(rows, col);
        if (isAlive(rows, col)) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[rows][col] = false;
          } else {
            newGrid[rows][col] = true;
          }
          //if cell is dead
        } else {
          if (neighbors === 3) {
            newGrid[rows][col] = true;
          }
        }
      }
    }
    setGeneretion((prevGen) => prevGen + 1);

    setBoard(newGrid);
    //a way to compare 2 arrays
    if (JSON.stringify(newGrid) === JSON.stringify(board)) {
      setBoard(emptyGrid);
    }
  }, [aliveNeighbors, gridSize, isAlive, board]);

  useEffect(() => {
    if (isPlaying) {
      switch (gameRules) {
        case "connways rules":
          intervalRef.current = setInterval(() => {
            handleTurnConnwaysRules();
          }, speed);
          break;
        case "hyper active life rules":
          intervalRef.current = setInterval(() => {
            handleTurnhyperActiveLifeRules();
          }, speed);
          break;
        case "Spontaneous rules":
          intervalRef.current = setInterval(() => {
            handleTurndSpontaneous();
          }, speed);
          break;
        case "stable state rules":
          intervalRef.current = setInterval(() => {
            handleTurnStableStateRules();
          }, speed);
          break;
        default:
          intervalRef.current = setInterval(() => {
            handleTurnConnwaysRules();
          }, speed);
      }
    } else {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [
    isPlaying,
    board,
    speed,
    gameRules,
    handleTurnConnwaysRules,
    handleTurnhyperActiveLifeRules,
    handleTurndSpontaneous,
    handleTurnStableStateRules,
    gridSize,
  ]);

  function resizeBoard(size) {
    setGridSize(size);
    let newSizeArr = Array(size)
      .fill()
      .map(() => Array(size).fill(false));
    setBoard(newSizeArr);
  }
  return (
    <div className="game-div">
      <div className="headers">
        <h1>game</h1>
        <h2>generation :{generetion} </h2>
      </div>
      <div className="instructions">
        <h4>change grid size</h4>
        <input
          type="range"
          min="1"
          max="30"
          value={gridSize}
          onChange={(e) => resizeBoard(Number(e.target.value))}
        />
        <h2>change game rules:</h2>
        <select
          name="rules"
          id="rules"
          onChange={(e) => setGameRules(String(e.target.value))}
        >
          <option value="connways rules">connways rules</option>
          <option value="hyper active life rules">
            hyper active life rules
          </option>
          <option value="Spontaneous rules">Spontaneous rules</option>
          <option value="stable state rules">stable state rules</option>
        </select>

        <h4>change seed size</h4>
        <input
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
        <h4>
          click on a square to revive it, or choose seed size, and hit play!
        </h4>
      </div>
      <div className="top-btn-container">
        <button className="top-btn seed-btn" onClick={() => seedArr(board)}>
          seed
        </button>

        <button
          className="top-btn play-btn"
          onClick={() => setPlaying(!isPlaying)}
        >
          {isPlaying ? "pause" : "play"}
        </button>
      </div>
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
