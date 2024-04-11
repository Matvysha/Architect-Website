window.onload = () => {
    setTimeout(() => {
        document.querySelector('body').classList.add('display')
    }, 4000)
}

document.querySelector('.hamburger-menu').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('change')
})

document.querySelector('.scroll-btn').addEventListener('click', () => {
    document.querySelector('html').style.scrollBehavior = 'smooth';
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'unset';
    }, 1000);
})

var showSmallVid = false,
    playing = false;

var video = document.getElementById('video'),
    smallVideo = document.getElementsByClassName('sticky-video')[0],
    trigger = document.getElementById('js-video-trigger');

document.addEventListener('DOMContentLoaded', function(){
    window.onscroll = function() {
      doScroll();
    }

    trigger.addEventListener('click', triggerVideo, false);

    initVideo();
  
},false);

//copy main video into sticky vid canvas
function initVideo() {
  var v = document.getElementById('video');
  var canvas = document.getElementById('video-canvas');
  var context = canvas.getContext('2d');

  var cw = 300;
  var ch = Math.floor(v.clientHeight / (v.clientWidth / 300));
  canvas.width = cw;
  canvas.height = ch;

  v.addEventListener('playing', function(){
      draw(this,context,cw,ch);
  },false);
}

//draw video to canvas
function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
}

//on scroll, show/hide side video
function doScroll() {
  var scrollPos = window.scrollY;
  
  if(scrollPos > smallVideo.offsetTop + 200)
  {    
    //sticky vid enter/leave
    if(showSmallVid)
    {
      smallVideo.style.right = 0 + 'px';
    }
    else
    {
      smallVideo.style.right = -300 + 'px';
    }
  }
  else
  {
    //sticky vid leave
    smallVideo.style.right = -300 + 'px';
  }
}

//on click of play button, trigger video
var triggerVideo = function()
{
  showSmallVid = false;
  trigger.classList.remove('mute');
  
  video.removeEventListener('playing', play, false);
  playing = false;

  //mute/unmute video
  video.muted = !video.muted;

  //on play video, restart video & trigger small video
  if(!video.muted)
  {
    trigger.classList.add("mute");
    video.currentTime = 0;

    showSmallVid = true;

    video.addEventListener('playing', play, false);
  }
  else
  {
    showSmallVid = false;
    smallVideo.style.right = -300 + 'px';
  }
}

//detect loop (second instance of 'playing' event) when mute not triggered
var play = function(event)
{
  if(!playing)
  {
    //ignore first time
    playing = true;
  }
  else
  {
    video.muted = true;
    trigger.classList.remove("mute");

    showSmallVid = false;
    smallVideo.style.right = -300 + 'px';

    video.removeEventListener('playing', play, false);
  }
}

const select = document.querySelector('select');
const allLang = ['en', 'ru'];

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substring(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    // document.querySelector('.lng-chip').innerHTML = langArr['chip'][hash];
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }

    }
}
changeLanguage();