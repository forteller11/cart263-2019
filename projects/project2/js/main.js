'use strict';

// window.onload = main;
// window.myJsonCallback = function(data){
//   console.log(data);
//   console.log('ahh');
// }

function setup(){
  noCanvas();
  let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=rainbow"
  // let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=myJsonCallback';
  loadJSON(url, (data) => {
      console.log(data);
  }, 'jsonp');
}

// function main() {
//
//   // let url = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=myJsonCallback';
//   // loadJSON(url, (data) => {
//   //     console.log(data);
//   // });
//   // let script = document.createElement('script');
//   // script.src = 'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=myJsonCallback'
//   // script.type = "application/json"
//   // let promise = fetch(script.src);
//   // promise.then
//   // document.body.appendChild(script)
//
//
//   // console.log('hello');
//   // body = document.getElementById('body');
//   // let promise = fetch('http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=my_embed_function');
//   // promise.then(console.log(promise));
//
// }
