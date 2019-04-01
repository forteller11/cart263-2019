matVecMult(arr2D,vec3D){ //matrix-Vector multiply

  let transformedVec = [];
  for (let i = 0; i < vec3D.length; i ++){ //initialise arr at 0
    transformedVec[i] = 0;
  }

  for (let i = 0; i < arr2D.length; i ++){ //rows of matrix
    for (let j = 0; j < arr2D[i].length; j ++){ //collums of matrix
      transformedVec[j] += arr2D[i][j] * vec3D[j]; //vec matrix mult
    }
  }

  return transformedVec;
}

matVecDiv(arr2D,vec3D){ //matrix-Vector multiply

  let transformedVec = [];
  for (let i = 0; i < vec3D.length; i ++){ //initialise arr at 0
    transformedVec[i] = 0;
  }

  for (let i = 0; i < arr2D.length; i ++){ //rows of matrix
    for (let j = 0; j < arr2D[i].length; j ++){ //collums of matrix
      transformedVec[j] += vec3D[j]/arr2D[i][j]; //vec matrix mult
    }
  }

  return transformedVec;
}
