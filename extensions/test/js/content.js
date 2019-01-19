console.log("the end of history log");

let text = [
"The",
"Manifesto",
"of",
"the",
"Communist",
"Party",
"was",
"written",
"by",
"Marx",
"and",
"Engels",
"as",
"the",
"Communist",
"League’s",
"programme",
"on",
"the",
"instruction",
"of",
"its",
"Second",
"Congress",
"(London,",
"November",
"29-December",
"8,",
"1847),",
"which",
"signified",
"a",
"victory",
"for",
"the",
"followers",
"of",
"a",
"new",
"proletarian",
"line",
"during",
"the",
"discussion",
"of",
"the",
"programme",
"questions.",
"When",
"Congress",
"was",
"still"
];
let textIndex = 0;
// let paragraphs = document.getElementsByTagName("p");
// for (let i = 0; i < paragraphs.length; i ++){
//   changeInnerHTML(paragraphs[i]);
//   // paragraphs[i].innerHTML = "ahh";
// }

let body =  [];
body = document.getElementsByTagName("body");
getChildrenOfElement(body[0]);

function getChildrenOfElement(parentRef){
  // changeInnerHTML(parentRef);
    parentRef.style.color = "cyan";

  for (let i = 0; i < parentRef.children.length; i ++){
    if (parentRef.children[i].hasChildren === true){ //if has children, recusrively repeat fucniton
      getChildrenOfElement(parentRef.children[i]);
    }
  }
}
// let element = document.childNodes;
// for (let i = 0; i < document.childNodes.length; i ++){
//   changeInnerHTML(document[i].childNodes);
//   console.log("dog");
// }

function changeInnerHTML(elementRef){

  let stringOfInnerHTML = [];
  stringOfInnerHTML = elementRef.innerHTML;
  console.log("innerhtml");
  console.log(stringOfInnerHTML);
  // console.log(stringOfInnerHTML);
  //create new string of text as many words long as the old innerHTML
  let newText = [];
  for (let i = 0; i < stringOfInnerHTML.length; i ++){
    if (textIndex > text.length){
      textIndex = 0;
    }
    newText.push(text[textIndex]);
    textIndex ++;
  }

  //replace old innerHTML with new text
  elementRef.innerHTML = newText;
}
