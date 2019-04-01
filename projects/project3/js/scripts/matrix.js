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
