function getZeroCells(matrix) {
  let arr = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        let blockRow = 3* Math.floor(i/3);
        let blockCol = 3* Math.floor(j/3);
        arr.push([i, j, blockRow, blockCol]);
      }
    }
  }
  return arr;
}

function isFit( matrix, zeroCell, value) {
  let col, row, i, j;
  let blockRow = zeroCell[2];
  let blockCol = zeroCell[3];
  row = matrix[zeroCell[0]];
  for (col = 0; col < 9; col++) {
    if (row[col] == value) {
      return false;
    }
  }
  col = zeroCell[1];
  for (row = 0; row < 9; row++) {
    if (matrix[row][col] == value){
      return false;
    }	
  }
  for (i = 0; i < 3; i++) {
    row = matrix[blockRow + i];
    for (j = 0; j < 3; j++) {
      if (row[blockCol + j] == value) {
        return false;
      }
    }
  }
  return true;
}

module.exports = function solveSudoku(matrix) {
  // const start = Date.now();
  let zeroCells = getZeroCells(matrix);
  let findFittedValue;
  let i, row, column, value;

  for (i = 0; i < zeroCells.length;) { 
    row = zeroCells[i][0];
    column = zeroCells[i][1];
    findFittedValue = false;

    for (value = matrix[row][column] + 1; !findFittedValue && value <= 9; value++ ) {
      if (isFit( matrix, zeroCells[i], value)) {
        findFittedValue = true;
        matrix[row][column] = value; 
        i++;
      }   
    }
    if (!findFittedValue){
      matrix[row][column] = 0;
      if (i == 0) {
        return null;
      }
      i--;
    }
  }
  // const finish = Date.now();
  // console.log( "Time execution: " + (finish - start) + "ms");
  return matrix;
}