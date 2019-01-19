chrome.runtime.onInstalled.addListener(function() {
  console.log("here i am");
});
document.getElementById("btn").onclick = function (){
  let btnRef = document.getElementById("btn");
  btnRef.innerHTML = "sqjiosqijo";
  console.log("BUTTONNN");
}
