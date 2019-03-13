'use strict';
//top 100 videos trending page 2019 March 13, 1:38 am

window.onload = main;

function main(){
  let id = videoIds[Math.floor(ran(videoIds.length-0.000001))];
  let offset = 20;
  let borderRadius = 180;
  let videoHalfSideLength = 200;


let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = window.innerHeight/2+'px'
div.style.left = window.innerWidth/2+'px'
div.style.width = borderRadius+'px';
div.style.height = borderRadius+'px';
document.body.appendChild(div);

let iframe = document.createElement('iframe');
iframe.width = '200';
iframe.height = 'auto';

// iframe.style.position = 'fixed';
// iframe.style.top = window.innerHeight/2+'px'
// iframe.style.left = window.innerWidth/2+'px'


iframe.src = "https://www.youtube.com/embed/"+id;
console.log(iframe.src);
iframe.width =  videoHalfSideLength;
iframe.height = videoHalfSideLength;
iframe.style.position = 'absolute';
iframe.style.top = '-10%';
iframe.style.left = '0%';
iframe.frameborder = '0';
iframe.autoplay = 'true';
iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
iframe.allowfullscreen = 'true'

div.appendChild(iframe);
//
// let video = document.createElement('video');
// iframe.appendChild(video);
//
// let source = document.createElement('source');
// source.src = 'https://www.youtube.com/embed/he_NTLU2wVQ';
// video.appendChild(source);
// // source.type = 'video/mp4';
// <iframe width="560" height="315" src="https://www.youtube.com/embed/he_NTLU2wVQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
}



let videoIds = [
'bF014EUJrSI',
'C-o0RgiXQfA',
'B1Kaq0_FqGs',
'XiNdXKtcEnQ',
'foyufD52aog',
'zh4J-yW3LHw',
'fAjZ8gAxq8o',
'NHeHbCBrlPM',
'EIcGiyUFjOI',
'G8mTgJaN40Q',
'IbXnMvwvNpE',
'hjWGfYtglYQ',
'iXwfBJYCTc4',
'y5gnlPTXGB4',
'VRB762N2RH8',
'3dXl28y7BIA',
'YWUeWAFYgtU',
'01ouUdAEFdU',
'Y2T4caGlK80',
'SoLCD3rP9DM',
'ZhObYiIcC5s',
'VeAK7Bv4F1o',
'TyCAialVM2M',
'Rq7PfhfV-rk',
'c7lbOXZtjlU',
'YwrIf6sfmak',
'W4kAmTW0s48',
'ikKY82_P4Vk',
'C01PeCpAScQ',
'MhCEdIqFCck',
'Pl8AJAt3TDg',
'8mP5xOg7ijs',
'UWelcIFAPxE',
'3ELhPuHg4cA',
'odQQ4jgGpFU',
'rMNAdHqGMhs',
'ieFrIvFzJd8',
'CT2IQt-NLak',
'wC64ZPJXMGU',
'PVjiKRfKpPI',
'KCCqqPqDqSY',
'hn3wJ1_1Zsg',
'IsvvoyA54AE',
'fGk7rc05pEc',
'oD1vbhicJUY',
'-BgZFaMJRxM',
'71k-mCPT14g',
'mg_K-Gs-GXo',
'ZsBO4b3tyZg',
'92tkZQB-Uj4',
'oiKj0Z_Xnjc',
'ctwvvoX8BaM',
'K5KAc5CoCuk',
'VHoT4N43jK8',
'wuCK-oiE3rM',
'dTfYEwjdmZE',
'DHvewgsDHsk',
'X99Rq2wIm4o',
'Z7BMSxla0ZU',
'Mw906Y5pkwY',
'a45lg5nn_I',
'rd7km6Au01g',
'YYZvm0ebKSY',
'TkPM83IpeNA',
'ZrE0ObPzPFc',
'J4g_QgJosHc',
'Dy-3FxwVf_M',
'aDcTSYZu-zY',
'JPJjwHAIny4',
'XVnsgxuEZaA',
'mIYzp5rcTvU',
'hlWiI4xVXKY',
'shoVsQhou-8',
'NliYy7iqh-U',
'3y-O-4IL-PU',
'ZAfAud_M_mg',
'a35rNEBNiO4',
'vtNJMAyeP0s',
'wVNc0er9G5E',
'QKYkZnxZ3ZA',
'ZSU8WWLTTqc',
'Ucq70gnYaok',
'SF58Lsvqg5E',
'RE87rQkXdNw',
'sYoqCJNPxv4',
'BklGhQYKl30',
'-d4jwvzt0RI',
'zXtsGAkyeIo',
'xpVfcZ0ZcFM',
'0M4nKru2H_Q',
'S1gp0m4B5p8',
'9CHnHH-kUQ8',
'U9BwWKXjVaI',
'ctXQxPO3bbg',
'ss7EJ-PW2Uk',
'vrEXmO5yJIc',
'WPni755-Krg',
'LJMuk01J5yw',
'gJRGkvNqrY4',
'5hqK-A0UxKw'
]
