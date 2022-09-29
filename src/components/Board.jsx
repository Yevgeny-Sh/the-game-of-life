import React, { useRef, useEffect } from "react";
import Square from "./Square";

//try to set age in ise effect

export default function Board(props) {
  const boardRef = useRef(null);

  useEffect(() => {
    boardRef.current.style.setProperty("--grid-size", props.size);
  }, [props.size]);

  let sqaures = props.board.map((col, i) => {
    return col.map((sqr, j) => {
      return (
        <Square
          x={i}
          y={j}
          // live={props.isAlive(i, j).toString()}
          live={props.isAlive(i, j)}
          setAlive={props.setAlive}
          className={props.isAlive(i, j) === true ? "green" : "red"}
          key={` ${i}+${j}`}
          aliveNeighbors={props.aliveNeighbors}
          // age={}
        ></Square>
      );
    });
  });

  return (
    <div className="board-container">
      <div ref={boardRef} className="board">
        {sqaures}
      </div>
    </div>
  );
}
