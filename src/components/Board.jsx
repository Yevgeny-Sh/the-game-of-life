import React from "react";
import Square from "./Square";

export default function Board(props) {
  let sqaures = props.board.map((col, i) => {
    return col.map((sqr, j) => {
      return (
        <Square
          x={i}
          y={j}
          live={props.isAlive(i, j).toString()}
          setAlive={props.setAlive}
          className={props.isAlive(i, j) === true ? "green" : "red"}
          key={` ${i}+${j}`}
        >
          {` ${props.size}`}
        </Square>
      );
    });
  });

  return (
    <div className="board-container">
      <div className="board">{sqaures}</div>
    </div>
  );
}
