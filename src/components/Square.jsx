import React, { useState } from "react";

export default function Square(props) {
  //let liveNeighbors = props.aliveNeighbors(props.x, props.y);

  // const [age, setage] = useState(0);

  // if (props.live) {
  //   setage(age + 1);
  // }
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
