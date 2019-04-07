'use strict';

/*
all vectors take the form [x,y,z,magnitude];
in proper notation though all vectors would actually take the form [x,y,z,1]
where "1" = the homogenous coordinate which can be used by translation matrices, this
one however does not have to be stored as is simply assumed by all matrix functions

the only time the magnitude of the vector [x,y,z,magnitude] is calculated is when
the vector is created or multiplied by a matrix
*/

function createVec(x,y,z){
  return [
    x,
    y,
    z,
    mag([x,y,z])
  ]
}

// function clone (array){
//   return array.slice();
// }

function matVecMult(m, v) { //matrix-Vector multiply
  return createVec(
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2] + m[0][3] * 1, //x
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2] + m[1][3] * 1, //y
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2] + m[2][3] * 1 //z
  )
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

function rotMatX(rad) {
  return [
    [1, 0, 0, 0],
    [0, Math.cos(rad), Math.sin(rad), 0],
    [0, -Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotMatY(rad, axis) {
  return [
    [Math.cos(rad), 0, -Math.sin(rad), 0],
    [0, 1, 0, 0],
    [Math.sin(rad), 0, Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotMatZ(rad, axis) {
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
function comp(m1,m2){
  const x1 = m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0]  + m1[0][2]*m2[2][0] + m1[0][3]*m2[3][0];
  const y1 = m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0]  + m1[1][2]*m2[2][0] + m1[1][3]*m2[3][0];
  const z1 = m1[2][0]*m2[0][0] + m1[2][1]*m2[1][0]  + m1[2][2]*m2[2][0] + m1[2][3]*m2[3][0];
  const w1 = m1[3][0]*m2[0][0] + m1[3][1]*m2[1][0]  + m1[3][2]*m2[2][0] + m1[3][3]*m2[3][0];

  const x2 = m1[0][1]*m2[0][1] + m1[0][1]*m2[1][1]  + m1[0][2]*m2[2][1] + m1[0][3]*m2[3][1];
  const y2 = m1[1][1]*m2[0][1] + m1[1][1]*m2[1][1]  + m1[1][2]*m2[2][1] + m1[1][3]*m2[3][1];
  const z2 = m1[2][1]*m2[0][1] + m1[2][1]*m2[1][1]  + m1[2][2]*m2[2][1] + m1[2][3]*m2[3][1];
  const w2 = m1[3][1]*m2[0][1] + m1[3][1]*m2[1][1]  + m1[3][2]*m2[2][1] + m1[3][3]*m2[3][1];

  const x3 = m1[0][2]*m2[0][2] + m1[0][1]*m2[1][2]  + m1[0][2]*m2[2][2] + m1[0][3]*m2[3][2];
  const y3 = m1[1][2]*m2[0][2] + m1[1][1]*m2[1][2]  + m1[1][2]*m2[2][2] + m1[1][3]*m2[3][2];
  const z3 = m1[2][2]*m2[0][2] + m1[2][1]*m2[1][2]  + m1[2][2]*m2[2][2] + m1[2][3]*m2[3][2];
  const w3 = m1[3][2]*m2[0][2] + m1[3][1]*m2[1][2]  + m1[3][2]*m2[2][2] + m1[3][3]*m2[3][2];

  const x4 = m1[0][3]*m2[0][3] + m1[0][3]*m2[1][3]  + m1[0][3]*m2[2][3] + m1[0][3]*m2[3][3];
  const y4 = m1[1][3]*m2[0][3] + m1[1][3]*m2[1][3]  + m1[1][3]*m2[2][3] + m1[1][3]*m2[3][3];
  const z4 = m1[2][3]*m2[0][3] + m1[2][3]*m2[1][3]  + m1[2][3]*m2[2][3] + m1[2][3]*m2[3][3];
  const w4 = m1[3][3]*m2[0][3] + m1[3][3]*m2[1][3]  + m1[3][3]*m2[2][3] + m1[3][3]*m2[3][3];


  return [
    [x1,x2,x3,x4],
    [y1,y2,y3,y4],
    [z1,z2,z3,z4],
    [w1,w2,w3,w4],
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


function scalarVecMult(scalar, v) { //scalar vector multiplication
  return [
    v[0] * scalar, //x
    v[1] * scalar, //y
    v[2] * scalar, //z
    v[3] * scalar //magnitude
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

function surfaceAreaOf2Vecs(v1,v2) {
  let b = projVecOntoVec(v1,v2);
  let height = Math.sqrt(v1[3]*v1[3] - b*b); //a^2 = c^2 - b^2
  return height*v2[3];
}

function normalize(v){ //normalizes v
  v[0] = v[0]/v[3];
  v[1] = v[1]/v[3];
  v[2] = v[2]/v[3];
  v[3] = 1;
}

function returnNormalized(v){ //returns normalized version of v
  return [
    v[0]/v[3],
    v[1]/v[3],
    v[2]/v[3],
    1
  ]
}

function cross(v1,v2){ //returns cross product
  return createVec(
    v1[1] * v2[2] - v1[2] * v2[1], //y1 z2 - y2 z1
    v1[2] * v2[0] - v1[0] * v2[2], //x1 z2 - x2 z1
    v1[0] * v2[1] - v1[1] * v2[0] //x1 y2 - y1 x2
  )
}

// function determinantOfVecs(v1,v2,v3) {
//   let b = projVecOntoVec(v1,v2);
//   let height = Math.sqrt(v1[3]*v1[3] - b*b); //a^2 = c^2 - b^2
//   //
//   // let b2 = projVecOntoVec(v1,v3);
//   // let depth = Math.sqrt(v1[3]*v1[3] - b2*b2); //a^2 = c^2 - b^2
//
//   return height*v2[3];
// }
