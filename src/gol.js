let arr = [];
let gridSize = 10;
function aliveNeighbors(row, col) {
  let count = 0;
  //check west
  if (row - 1 >= 0) {
    if (arr[row - 1][col] === true) count++;
  }
  //check north west
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (arr[row - 1][col - 1] === true) count++;
  }
  //check north east
  if (row - 1 >= 0 && col + 1 < gridSize) {
    if (arr[row - 1][col + 1] === true) count++;
  }
  //
  if (col - 1 >= 0) {
    if (arr[row][col - 1] === true) count++;
  }
  if (col + 1 < gridSize) {
    if (arr[row][col + 1] === true) count++;
  }
  if (row + 1 < gridSize) {
    if (arr[row + 1][col] === true) count++;
  }
  if (row + 1 < gridSize && col - 1 >= 0) {
    if (arr[row + 1][col - 1] === true) count++;
  }
  if (row + 1 < gridSize && col + 1 < gridSize) {
    if (arr[row + 1][col + 1] === true) count++;
  }
  return count;
}

function isAlive(x, y) {
  return arr[x][y];
}
function game(arr) {
  let newGrid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(false));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let neighbors = aliveNeighbors(i, j);
      if (isAlive(i, j)) {
        //
        if (neighbors <= 2 || neighbors >= 3) {
          newGrid[i][j] = false;
        }
        //cell is dead
      } else {
        if (neighbors === 3) {
          newGrid[i][j] = true;
        }
      }
    }
  }
  arr = [...newGrid];
}
