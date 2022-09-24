import React from "react";

export default function Board() {
  let sqaures = props.board.map((col, i) => {
    return col.map((sqr, j) => {
      return (
        <Square
          x={i}
          y={j}
          live={isAlive(i, j).toString()}
          setAlive={props.setAlive}
          className={isAlive(i, j) === true ? "green" : "red"}
          key={` ${i}+${j}`}
        >
          {` ${props.size}`}
        </Square>
      );
    });
  });

  return (
    <div className="board-container">
      <div className="board">{/* {sqaures} */}</div>
    </div>
  );
}
