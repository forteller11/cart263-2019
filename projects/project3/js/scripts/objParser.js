'use strict';
//parses obj and converts to file format
function convertObjFileToMeshBlob(obj) {
  //initialize vars
  let vArr = []; //vertices
  let componentIndex = 0; //what component of vertex is currently being parsed?
  let vnArr = []; //vertexNormals
  let fArr = []; //array of arrays of connected vertex's
  let faceIndex = 0; //how many faces have currently been parsed
  fArr[faceIndex] = []; //prep 2D face array
  let currentWord = ''; //string of current num
  let currentDataType = 'irrelevant'; //what type of data is currently being parsed (vertex, vertexnormal, face, or irrelevant (all other) data)

  for (let i = 0; i < obj.length; i++) {
    // console.log(obj[i]);
    if ((obj[i] === ' ') || (obj[i] === '\n') || obj[i] === '/') { //if at end of word, push data to relevant data type if currentDataType is a keyword
      if (!(Number.isNaN(Number(currentWord)))) { //if string is numeric, then push it to approrpaite array depending of currentDataType
        if (currentDataType === 'irrelevant') {}
        if (currentDataType === 'vertex') {
          if (componentIndex === 0) { //if first component of vertex, begin storing vertex as vector
            vArr.push(new Vector3D(Number(currentWord), 0, 0)); //set x component of vec
          }
          if (componentIndex === 1) {
            vArr[vArr.length - 1].y = Number(currentWord); //set y comopnent
          }
          if (componentIndex === 2) { //if at component 3 of vec, reset
            vArr[vArr.length - 1].z = Number(currentWord); //z component
            componentIndex = 0;
          } else { //if not reset, itterate
            componentIndex++;
          }
        }
        if (currentDataType === 'vertexNormal') {
          vnArr.push(Number(currentWord))
        }
        if (currentDataType === 'face') {
          fArr[faceIndex].push(Number(currentWord));
          if (obj[i] === '\n') {
            faceIndex++;
            fArr[faceIndex] = []
          }
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

  //remove unnecessary values from face, leaving only the connected verts
  fArr.splice(fArr.length - 1, 1); //also clip final empty face array (artifact of algorithim)
  for (let i = 0; i < fArr.length; i++) {
    let reducedFArr = [];
    for (let j = 0; j < fArr[i].length; j += 3) {
      reducedFArr.push(fArr[i][j] - 1); //make it start at 0
    }
    fArr[i] = reducedFArr;
    reducedFArr = [];
  }

  let fObjArr = [];
  for (let i = 0; i < fArr.length; i ++){
    const index1 = fArr[i][0];
    const index2 = fArr[i][1];
    const index3 = fArr[i][2];
    fObjArr[i] = new Triangle(vArr[index1],vArr[index2],vArr[index3]); //converts array of faces into Triangle object containing vertex indexes and avg position of vertexes
  }

  const meshBlob = {
    verts: vArr,
    vertNorms: vnArr,
    faces: fObjArr
  }
  dLog(meshBlob);

  return meshBlob;
}
