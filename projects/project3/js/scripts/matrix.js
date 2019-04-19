'use strict';
/*
my implementation of a quick matrix / vector library where vectors are represented as
1D arrays and matrices as 2D arrays (instead of objects) for performance and scalability purposes
I removed alot of the error checking because I thought it might effect performance as
this library is being used many times by all the vertices in a given scene so
the functions tend to be barebrones.

Note: I think matrices might be rotated 90* in these matrix functions as I wasn't comfortable
with linear algebra, this doesn't effect end vectors because all functions account for this
but it is a qirk worth mentioning */
function matVecMult(mat, vec) { //matrix-Vector multiply
  let transformedVec = new Array(vec.length).fill(0); //creates an array of vec length where all elements === 0
  for (let i = 0; i < mat.length; i++) { //rows of matrix
    for (let j = 0; j < mat[i].length; j++) { //collums of matrix
      transformedVec[i] += mat[i][j] * vec[j]; //vec matrix mult
    }
  }
  return transformedVec;
}

function addVecs(v1,v2){ //add like components of two vectors together
  let newV = new Array(v1.length);
  for (let i = 0; i < v1.length; i ++){
    newV[i] = v1[i] + v2[i];
  }
  return newV;
}

function subVecs(v1,v2){ //v1-v2 (subtract like components of two vectors)
  let newV = new Array(v1.length);
  for (let i = 0; i < v1.length; i ++){
    newV[i] = v1[i] - v2[i];
  }
  return newV;
}

function rotMatX(rad){ //rotates a homogenous (4D) vector along x-axis
  return [
    [1, 0, 0, 0],
    [0, Math.cos(rad), Math.sin(rad), 0],
    [0, -Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 0, 1]
  ]
}

function rotMatY(rad){ //rotates a homogenous (4D) vector along y-axis
  return [
    [Math.cos(rad), 0, -Math.sin(rad), 0] ,
    [0, 1, 0, 0] ,
    [Math.sin( rad), 0, Math.cos(rad), 0],
    [0, 0, 0 , 1]
  ]
}

function rotMatZ(rad){ //rotates a homogenous (4D) vector along z-axis
  return [
    [Math.cos(rad), Math.sin(rad), 0, 0],
    [-Math.sin(rad), Math.cos(rad), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
}

function meanVec(...args){ //returns vector whose components are the mean of all the vectors put in as paramters
  //where each argument is an array/vector of same length, assumes equal length of all vectors
  let meanV = new Array(args[0].length).fill(0);
  for (let i = 0; i < args[0].length; i ++){ //for every component of every vec
    for (let j = 0; j < args.length; j ++){ //cycle through all vectors
      meanV[i] += args[j][i];
    }
    meanV[i] = meanV[i]/args.length;
  }
  return meanV;
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

function transMat(...args) { //returns 4x4 translation matrix
  return [
    [1, 0, 0, args[0]],
    [0, 1, 0, args[1]],
    [0, 0, 1, args[2]],
    [0, 0, 0, 1]
  ]
}

function matMatComp(...args) { //composed n matrices together into a single transformation matrix
  //composiiton matrix treats the latest to arguments (farthest right) as if they were transformed first
  let mat1;
  let mat2;
  let composedMat = [];

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

function dot(v1, v2) { //dot product
  let dotSum = 0;
  for (let i = 0; i < v1.length; i++) {
    dotSum += v1[i] * v2[i];
  }
  return dotSum;
}

function scalarVecMult(scalar,v){ //scalar vector multiplication
  let newVec = new Array(v.length);
  for (let i = 0; i < v.length; i++){
    newVec[i] = v[i] * scalar;
  }
  return newVec;
}

function mag(v){ //returns magnitude of a vector
  let sum = 0;
  for (let i = 0; i < v.length; i ++){
    sum += Math.pow(v[i], 2);
  }
  return Math.sqrt(sum);
}

function normalize(v){ //normalizes a vector
  let unitVec = new Array(v.length);
  let magnitude = mag(v);
  for (let i = 0; i < unitVec.length; i++){
    unitVec[i] = v[i]/magnitude;
  }
  return unitVec;
}

function crossEuclid(v1,v2){ //returns cross product********
  //NOTE: returns vector perpindicular in euclidian space (cross in 3D) not using w dimension!
  let cross =   [
      v1[1] * v2[2] - v1[2] * v2[1], //y1 z2 - y2 z1
      v1[2] * v2[0] - v1[0] * v2[2], //x1 z2 - x2 z1
      v1[0] * v2[1] - v1[1] * v2[0]
    ]
  return cross;

}
