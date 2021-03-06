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
      // console.log(currentWord);
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

  const meshBlob = {
    verts: vArr,
    vertNorms: vnArr,
    faces: reducedFArr
  }

  dLog(meshBlob);
  return meshBlob;
}
