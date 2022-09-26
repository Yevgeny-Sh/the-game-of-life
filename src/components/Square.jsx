import React from "react";

export default function Square(props) {
  // let liveNeighbors = props.aliveNeighbors(props.x, props.y);
  return (
    <div className="square">
      <button
        className={`btn  ${props.className}`}
        onClick={() => props.setAlive(props.x, props.y)}
      >
        {/* {liveNeighbors} */}
      </button>
    </div>
  );
}
