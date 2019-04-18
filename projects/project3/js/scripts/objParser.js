'use strict';
//parses obj and converts to file format
function convertObjFileToMeshBlob(obj) {
  //initialize vars
  let vArr = []; //vertices
  let vnArr = []; //vertexNormals
  let fArr = []; //array of arrays of connected vertex's
  let currentWord = ''; //string of current num
  let currentDataType = 'irrelevant'; //what type of data is currently being parsed (vertex, vertexnormal, face, or irrelevant (all other) data)

  for (let i = 0; i < obj.length; i++) {
    // console.log(obj[i]);
    if ((obj[i] === ' ') || (obj[i] === '\n') || obj[i] === '/') { //if at end of word, push data to relevant data type if currentDataType is a keyword
      if (!(Number.isNaN(Number(currentWord)))) { //if string is numeric, then push it to approrpaite array depending of currentDataType
        if (currentDataType === 'irrelevant') {}
        if (currentDataType === 'vertex') {
          vArr.push(Number(currentWord));
        }
        if (currentDataType === 'vertexNormal') {
          vnArr.push(Number(currentWord)); //-1 so index starts at 0 and not 1
        }
        if (currentDataType === 'face') {
          fArr.push(Number(currentWord));
        }
      } else { //if string is not numeric, then it is irrelvant until proven otherwise
        currentDataType = 'irrelevant';
      }
      /*//if at end of word and not current parsing a relevant datatype (v,vn,f)
       then see if word indicates that this is a relevant datatype, otherwise it remains irrelevant*/
      if (currentWord === 'v') {
        currentDataType = 'vertex'
      }
      if (currentWord === 'vn') {
        currentDataType = 'vertexNormal'
      }
      if (currentWord === 'f') {
        currentDataType = 'face'
      }
      currentWord = ''; //reset current word

    } else { //if not a space
      currentWord += obj[i]; //add current parsed character to currentWord
    }
  }

  //remove unnecessary values from face (all but first letter of face format of a/b/c), leaving only the connected verts (a)
  let reducedFArr = [];
  for (let i = 0; i < fArr.length; i+=3) {
    reducedFArr.push(fArr[i]-1); //make it start at 0
  }

  //make faces 2D arrays where each index i === 1 face and j represents different indexes of the verts which make it up
  let fArr2D = new Array(reducedFArr.length/3);
  for (let i = 0; i < fArr2D.length; i ++){
    let ii = i*3;
      fArr2D[i] = [
        reducedFArr[ii+0],
        reducedFArr[ii+1],
        reducedFArr[ii+2]
      ]
  }

  let vArr2D = new Array(vArr.length/3); //make 2D array where each i === a vert and j === [x,y,z] components
  for (let i = 0; i < vArr2D.length; i ++){
    let ii = i*3;
      vArr2D[i] = [
        vArr[ii+0],
        vArr[ii+1],
        vArr[ii+2]
      ];
  }


  const meshBlob = {
    verts: vArr2D,
    vertNorms: vnArr,
    faces: fArr2D
  }

  dLog(meshBlob);
  return meshBlob;
}
