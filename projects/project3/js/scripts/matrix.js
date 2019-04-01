'use strict';

function matVecMult(mat,vec){ //matrix-Vector multiply
  //matrix is 2D array
  //vector is 1D array

  let transformedVec = [];
  for (let i = 0; i < mat.length; i ++){ //initialise vector output to have components === rows of matrix
    transformedVec[i] = 0;
  }

  for (let i = 0; i < mat.length; i ++){ //rows of matrix
    for (let j = 0; j < mat[i].length; j ++){ //collums of matrix
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
function matMatMult(mat1,mat2){
  let transformedMat = [];
  for (let i = 0; i < mat1.length; i ++){ //initialise vector output to have components === rows of matrix
    for (let j = 0; j < mat1[i].length; j ++){ //initialise vector output to have components === rows of matrix
      transformedMat[i] = [];
    }
  }

  //turn all rows of m1 into vectors
  //invert matrix so that cols are parent matrix (matrix [j][i])
  let mat2Invert = [];
  for (let j = 0; j < mat2[0].length; j ++){ //get
      mat2Invert[j] = [];
      for (let i = 0; i < mat2.length; i ++){
        mat2Invert[j][i] = mat2[i][j] //rows = cols, cols = rows (rotated 90?)
      }
  }

for (let i = 0; i < mat1.length; i ++){
  for (let j = 0; j < mat1[i].length; j ++){
    // console.log(dot(mat1Invert[i],mat2[j]));
    console.log(`${mat1[i]}
${mat2Invert[j]}
=== ${dot(mat1[i],mat2Invert[j])}`)
    transformedMat[i][j] = dot(mat1[i],mat2Invert[j]);
  }
}

console.log(mat1);
console.log(mat2);
console.log(transformedMat);
console.log(`${mat1}
${mat2}
===============================
${transformedMat}`);
return transformedMat;
}

function dot(v1,v2){ //dot product
  //each vec is 1D array
  if (!(v1.length === v2.length)){ console.log(`ERROR AT FUNCTION "DOT":
  vectors dimensions aren't equal!`)}

  let dotSum = 0;
  for (let i = 0; i < v1.length; i ++){
    dotSum += v1[i]*v2[i];
  }
  return dotSum;
}
