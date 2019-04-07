'use strict';

function matVecMult(m, v) { //matrix-Vector multiply
  return [
    m[0][0] * v[0] + m[0][1] * v[0] + m[0][2] * v[0] + m[0][3] * v[0],
    m[1][0] * v[0] + m[1][1] * v[0] + m[1][2] * v[0] + m[1][3] * v[0],
    m[2][0] * v[0] + m[2][1] * v[0] + m[2][2] * v[0] + m[2][3] * v[0],
    1
  ]
}

function rotXYZMat(x, y, z) {
  console.log('ERROR: this function is unfinished!')
  return [
    [1, 0, 0, 0],
    [0, Math.cos(rad), Math.sin(rad), 0],
    [0, -Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotXMat(rad) {
  return [
    [1, 0, 0, 0],
    [0, Math.cos(rad), Math.sin(rad), 0],
    [0, -Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotYMat(rad, axis) {
  return [
    [Math.cos(rad), 0, -Math.sin(rad), 0],
    [0, 1, 0, 0],
    [Math.sin(rad), 0, Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotZMat(rad, axis) {
  return [
    [Math.cos(rad), Math.sin(rad), 0, 0],
    [-Math.sin(rad), Math.cos(rad), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
}

function nDiagMat(...args) { //returns diagonal matrix of n size
  //args[0] === size of square matrix
  //args[1] === what to put on diagonals of matrix
  //if no args[1] is specefied functions returns an identity matrix of size args[0]
  //if no args[2] is specefied last cols (homogneous coord) is identity (1)
  let n = args[0];
  let a;
  let b;
  if (args.length === 2) {
    a = args[1]
  } else {
    a = 1
  }
  if (args.length === 3) {
    b = args[2]
  } else {
    b = 1
  }

  let rows = [];
  let identityIndex = 0; //where to place 1
  for (let i = 0; i < n; i++) {
    rows[i] = []; //cols
    for (let j = 0; j < n; j++) {
      if (j === identityIndex) { //if diagonal
        rows[i][j] = a;
      } else {
        rows[i][j] = 0;
      }
      if (j === n - 1) {
        rows[i][j] = b; //always make homogenous coord 1 unless otherwise specefied
      }
    }
    identityIndex++;
  }
  return rows;
}

function diagMat(...args) { //returns 4x4 diag matrix
  let a = 1;
  let b = 1;
  let c = 1;
  let d = 1;

  switch (args.length) {
    case 0:
      break;
    case 1:
      a = args[0];
      b = args[0];
      c = args[0];
      break;
    case 3:
      a = args[0];
      b = args[1];
      c = args[2];
      break;
    case 4:
      a = args[0];
      b = args[1];
      c = args[2];
      d = args[3];
      break;
    default:
      console.log(`ERROR: ${args.length} is wrong num of arguments!`);
      break;
  }

  return [
    [a, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, c, 0],
    [0, 0, 0, d]
  ]
}

function transMat(x, y, z) { //returns 4x4 translation matrix
  return [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1]
  ]
}

function matMatComp(...args) { //composed n matrices together into a single transformation matrix
  //composiiton matrix treats the latest elements as if they were transformed first args[length-1],args[length-2],args[length-3]...

  let mat1;
  let mat2;
  let composedMat = [];

  //each index of argument will be a 2D array representing a matrix

  //initialise output matrix as 2D array
  for (let k = 0; k < args.length - 1; k++) {
    //determine inputs
    if (k === 0) { //if index first time, first mat is simply first argument, otherwise it's composed mat
      mat1 = args[0];
    } else {
      mat1 = [...composedMat]; //copies composed matrix to mat1 (as opposed to just storing a reference/poitner to it)
    }
    mat2 = args[k + 1];

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


function scalarVecMult(scalar, vec) { //scalar vector multiplication
  return [
    vec[0] * scalar,
    vec[1] * scalar,
    vec[2] * scalar,
    1
  ];
}

function mag(v){
  return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
}
function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function projVecOntoVec(v1, v2) {
  return dot(v1, v2) / mag(v2);
}

function determinant(v1, v2) { //dot product
  //each vec is 1D array
  // v
  // dotSum
  // return dotSum;
}

function cross(v1,v2) {

}
