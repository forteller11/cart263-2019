'use strict';

function matVecMult(mat, vec) { //matrix-Vector multiply
  //matrix is 2D array
  //vector is 1D array

  let transformedVec = [];
  for (let i = 0; i < mat.length; i++) { //initialise vector output to have components === rows of matrix
    transformedVec[i] = 0;
  }
  /*treat each col of matrix as an ntuple
  [x1, x2, x3]
  [y1, y2, y3]
  [z1, z2, z3]
  */
  for (let i = 0; i < mat.length; i++) { //rows of matrix
    for (let j = 0; j < mat[i].length; j++) { //collums of matrix
      transformedVec[i] += mat[i][j] * vec[j]; //vec matrix mult
    }
  }

  return transformedVec;
}

// dot product of vec horz with vec vert in each segment,
`
[x1a,y1a]   [x1b,x2b]   == [1a*1b,1a*2b]
[x2a,y2a]   [y1b,y2b]   == [2a*1b,2a*2b]

first matrix rows are vec, 2nd collums are vec, dot v*v in and the result is the transformed matrix
basically tra
`

function dot(v1, v2) { //dot product
  //each vec is 1D array
  if (!(v1.length === v2.length)) {
    console.log(`ERROR AT FUNCTION "DOT":
  vectors dimensions aren't equal!`)
  }

  let dotSum = 0;
  for (let i = 0; i < v1.length; i++) {
    dotSum += v1[i] * v2[i];
  }
  return dotSum;
}

function rotationMat(rad, axis) {
  //rad === radians to rotate
  //axis === string of what axis to rotate 'x','y' or 'z'

  switch (axis) {
    case 'x':
      {
        return [
          [1, 0, 0, 0],
          [0, Math.cos(rad), Math.sin(rad), 0],
          [0,-Math.sin(rad), Math.cos(rad), 0],
          [0, 0, 0, 1]
        ]
      }
    case 'y':
      {
        return [
          [Math.cos(rad), 0, -Math.sin(rad), 0],
          [0, 1, 0, 0],
          [Math.sin(rad), 0,  Math.cos(rad), 0],
          [0, 0, 0, 1]
        ]
      }
    case 'z':
      {
        return [
          [ Math.cos(rad), Math.sin(rad), 0, 0],
          [-Math.sin(rad), Math.cos(rad), 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ]
      }
    default:
      console.log('Error:Invalid axis declaration!');
      break
  }
}

function diagonalMat(...args) {  //returns diagonal matrix of n size
  //args[0] === size of square matrix
  //args[1] === what to put on diagonals of matrix
  //if no args[1] is specefied functions returns an identity matrix of size args[0]
  //if no args[2] is specefied last cols (homogneous coord) is identity (1)
  let n = args[0];
  let a;
  let b;
  if (args.length === 2){ a = args[1]}
  else { a = 1}
  if (args.length === 3){ b = args[2]}
  else { b = 1}

  let rows = [];
  let identityIndex = 0; //where to place 1
  for (let i = 0; i < n; i ++){
    rows[i] = []; //cols
    for (let j = 0; j < n; j++){
      if (j === identityIndex){ //if diagonal
        rows[i][j] = a;
      } else {
        rows[i][j] = 0;
      }
      if (j === n-1){
        rows[i][j] = b; //always make homogenous coord 1 unless otherwise specefied
      }
    }
    identityIndex++;
  }
  return rows;
}


function matMatComposition(...args) { //composed n matrices together into a single transformation matrix
  //composiiton matrix treats the latest elements as if they were transformed first args[length-1],args[length-2],args[length-3]...

  let mat1;
  let mat2;
  let composedMat = [];

  //each index of argument will be a 2D array representing a matrix

  //initialise output matrix as 2D array
  for (let k = 0; k < args.length-1; k++){
    //determine inputs
    if (k === 0){ //if index first time, first mat is simply first argument, otherwise it's composed mat
      mat1 = args[0];
    } else {
      mat1 = [...composedMat]; //copies composed matrix to mat1 (as opposed to just storing a reference/poitner to it)
    }
    mat2 = args[k+1];

    //empty composedMat
    for (let i = 0; i < args[k].length; i++) {
      for (let j = 0; j < args[k][i].length; j++) {
        composedMat[i] = [];
      }
    }

  //invert rows/cols of matrix arr[j][i]) instead of arr[i][j]
  let mat2Invert = [];
  for (let j = 0; j < mat2[0].length; j++) { //get
    mat2Invert[j] = [];
    for (let i = 0; i < mat2.length; i++) {
      mat2Invert[j][i] = mat2[i][j] //rows = cols, cols = rows (rotated 90?)
    }
  }

  //treat i of matrices/arrays as vectors, itterate through mats and dot product their vects together
  for (let i = 0; i < mat1.length; i++) {
    for (let j = 0; j < mat1[i].length; j++) {
      composedMat[i][j] = dot(mat1[i], mat2Invert[j]);
    }
  }
}
  return composedMat;
}

function dot(v1, v2) { //dot product
  //each vec is 1D array
  if (!(v1.length === v2.length)) {
    console.log(`ERROR AT FUNCTION "DOT":
  vectors dimensions aren't equal!`)
  }

  let dotSum = 0;
  for (let i = 0; i < v1.length; i++) {
    dotSum += v1[i] * v2[i];
  }
  return dotSum;
}
