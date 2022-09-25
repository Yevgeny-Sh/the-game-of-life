import React, { useState, useEffect, useRef, useCallback } from "react";
import Square2 from "./Square2";

export default function Board(props) {
  const boardRef = useRef(null);
  const [gridSize, setGridSize] = useState(10);
  //const [width, setWidth] = useState(gridSize * gridSize * gridSize);

  const [board, setBoard] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false))
  );

  useEffect(() => {
    boardRef.current.style.setProperty("--grid-size", gridSize);
  }, [gridSize]);

  let buttons = board.map((col) => {
    return col.map(() => {
      return <button>{"button"}</button>;
    });
  });

  function resizeBoard(size) {
    setGridSize(size);
    let newSizeArr = Array(size)
      .fill()
      .map(() => Array(size).fill(false));
    setBoard(newSizeArr);
  }

  return (
    <div className="test-grid-2-container">
      <h4>change grid size</h4>
      <input
        type="range"
        min="1"
        max="30"
        value={gridSize}
        onChange={(e) => resizeBoard(Number(e.target.value))}
      />
      <div className="board-container">
        <div className="board" ref={boardRef}>
          {buttons}
        </div>
      </div>
    </div>
  );
}
