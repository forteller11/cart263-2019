'use strict';

window.onload = main;

function main(){
  console.log('main');
  let url = "https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?
        part=snippet
        &order=viewCount
        &q=skateboarding+dog
        &type=video
        &videoDefinition=high";

        console.log(url);
}
// function setup(){
//   noCanvas();
//
//   // let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=rainbow"
//   let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch?v=nZ5dRiSlZRE&callback=function(){console.log("hey")}';
//   loadJSON(url, gotData,'jsonp');
//
//   function gotData(data){
//     console.log(data);
//   }
// }

//parse yourself, go until you find ... then return that value
// function main() {
//
//   let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=myJsonCallback';
//
//   // let script = document.createElement('script');
//   // script.src = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=myJsonCallback'
//   // script.type = "application/json"
//   // let promise = fetch(script.src);
//   // promise.then
//   // document.body.appendChild(script)
//   //
//   //
//   // console.log('hello');
//   // body = document.getElementById('body');
//
//   let promise = fetch('http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=my_embed_function');
//   promise.then(console.log(promise));
//
// }

// function getData(data)
// {
//     console.log('IGOTITTTTTTTTTTTTTTTTTTTTTTTTTTTT');
// }
// function main(){
// let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch?v=nZ5dRiSlZRE&format=json&callback=getData'
// url =  "https://www.youtube.com/embed/ZK3O402wf1c"
// let script = document.createElement('script');
// script.src = url;
//
// // window.open(script.src);
//
// document.getElementsByTagName('head')[0].appendChild(script);
// }
// // or document.head.appendChild(script) in modern browsers

// function main(){
//
//   console.log(document.body);
//   let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch?v=nZ5dRiSlZRE&callback='+getData;
//   // url = 'https://www.youtube.com/watch?v=2vOPEuiGXVo';
//     window.open(url);
//   let promise = fetch(url);
//   promise.then(response => console.log(response));
//
// }
//
// function getData (getData){
//   console.log(document.body);
//   return document.body;
// }
