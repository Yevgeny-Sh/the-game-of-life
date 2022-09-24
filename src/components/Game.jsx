import React, { useState, useEffect, useRef } from "react";

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

  return (
    <div className="game-div" ref={boardRef}>
      <h1>game</h1>
      <h1>generetion:{generetion} </h1>

      <button className="btn play-btn" onClick={() => seedArr(board)}>
        seed
      </button>
      <button className="btn seed-btn" onClick={() => handlePlay()}>
        play
      </button>
      <Board board={board} size={gridSize} setAlive={setAlive}></Board>
    </div>
  );
}
