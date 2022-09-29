import React from "react";

export default function Square(props) {
  return (
    <div className="square">
      <button
        className={`btn  ${props.className}`}
        onClick={() => props.setAlive(props.x, props.y)}
      >
        {}
      </button>
    </div>
  );
}
