let time = 40;

let timer = document.getElementById("timer");
timer.innerText = time;

let n_yellow = document.getElementsByClassName("c1")[0];
let n_red = document.getElementsByClassName("c2")[0];
let n_green = document.getElementsByClassName("c3")[0];

let w_green = document.getElementsByClassName("c4")[0];
let w_red = document.getElementsByClassName("c5")[0];
let w_yellow = document.getElementsByClassName("c6")[0];

let s_green = document.getElementsByClassName("c7")[0];
let s_red = document.getElementsByClassName("c8")[0];
let s_yellow = document.getElementsByClassName("c9")[0];

let e_green = document.getElementsByClassName("c10")[0];
let e_red = document.getElementsByClassName("c11")[0];
let e_yellow = document.getElementsByClassName("c12")[0];

n_yellow.style.opacity = 0.2;
n_red.style.opacity = 0.2;
n_green.style.opacity = 0.2;
w_green.style.opacity = 0.2;
w_red.style.opacity = 0.2;
w_yellow.style.opacity = 0.2;
s_green.style.opacity = 0.2;
s_red.style.opacity = 0.2;
s_yellow.style.opacity = 0.2;
e_green.style.opacity = 0.2;
e_red.style.opacity = 0.2;
e_yellow.style.opacity = 0.2;

function start() {
  //because the setTimeout will run only after the given time
  //so first initial call we have to manually give
  loop();
  timeDec();
  setInterval(timeDec, 1000);
  setInterval(loop, 40000);
}

function timeDec() {
  timer.innerText = time;

  //set time in dignal light
  // if(time> 32){
  //   n_green.innerText=time-32;

  //   //other 3 red na time add
  // }
  // if(time>30){
  //   n_yellow.innerText=time-30;
  // }if(time>20){
  //   n_red.innerText= time -20;
  // }

  time--;
  if (time <= 0) time = 40;
}
function allred() {
  n_red.style.opacity = 1;
  w_red.style.opacity = 1;
  s_red.style.opacity = 1;
  e_red.style.opacity = 1;
}

function loop() {
  allred();
  n_red.style.opacity = 0.2;
  n_green.style.opacity = 1;

  setTimeout(() => {
    n_green.style.opacity = 0.2;
    n_yellow.style.opacity = 1;
  }, 8000);

  // /e_green on 6
  setTimeout(() => {
    n_yellow.style.opacity = 0.2;
    allred();
    w_green.style.opacity = 1;
    w_red.style.opacity = 0.2;
  }, 10000);

  //yellow on
  setTimeout(() => {
    w_yellow.style.opacity = 1;
    w_green.style.opacity = 0.2;
  }, 18000);

  // east red on , s_green on
  setTimeout(() => {
    allred();
    w_yellow.style.opacity = 0.2;

    s_green.style.opacity = 1;
    s_red.style.opacity = 0.2;
  }, 20000);

  //s_yellow on , green off
  setTimeout(() => {
    s_yellow.style.opacity = 1;
    s_green.style.opacity = 0.2;
  }, 28000);

  setTimeout(() => {
    s_yellow.style.opacity = 0.2;
    allred();
    e_green.style.opacity = 1;
    e_red.style.opacity = 0.2;
  }, 30000);

  setTimeout(() => {
    e_green.style.opacity = 0.2;
    e_yellow.style.opacity = 1;
  }, 38000);

  setTimeout(() => {
    e_yellow.style.opacity = 0.2;
  }, 40000);
}