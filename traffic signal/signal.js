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
  loop();
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
  }, 80);

  // /e_green on
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
  }, 180);

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
  }, 280);

  setTimeout(() => {
    s_yellow.style.opacity = 0.2;
    allred();
    e_green.style.opacity = 1;
    e_red.style.opacity = 0.2;
  }, 30000);

  setTimeout(() => {
    e_green.style.opacity = 0.2;
    e_yellow.style.opacity = 1;
  }, 380);

  setTimeout(() => {
    e_yellow.style.opacity = 0.2;
  }, 40000);
}

// let time = 40;

// let n_yellow = document.getElementsByClassName("c1")[0];
// let n_red = document.getElementsByClassName("c2")[0];
// let n_green = document.getElementsByClassName("c3")[0];

// let w_green = document.getElementsByClassName("c4")[0];
// let w_red = document.getElementsByClassName("c5")[0];
// let w_yellow = document.getElementsByClassName("c6")[0];

// let s_green = document.getElementsByClassName("c7")[0];
// let s_red = document.getElementsByClassName("c8")[0];
// let s_yellow = document.getElementsByClassName("c9")[0];

// let e_green = document.getElementsByClassName("c10")[0];
// let e_red = document.getElementsByClassName("c11")[0];
// let e_yellow = document.getElementsByClassName("c12")[0];

// start();

// function start() {
//   setInterval(runSignal, 1000);
// }

// function runSignal() {

//   resetLights();

//   let passed = 40 - time;              // seconds passed
//   let block = Math.floor(passed / 10); // 0=N,1=W,2=S,3=E
//   let secInBlock = passed % 10;        // 0–9
//   let remainingBlock = 10 - secInBlock;

//   // ===== ACTIVE DIRECTION =====
//   if (block === 0) activate(n_green, n_yellow, n_red, remainingBlock);
//   if (block === 1) activate(w_green, w_yellow, w_red, remainingBlock);
//   if (block === 2) activate(s_green, s_yellow, s_red, remainingBlock);
//   if (block === 3) activate(e_green, e_yellow, e_red, remainingBlock);

//   // ===== RED TIMERS =====
//   setRedTime(0, block, remainingBlock, n_red);
//   setRedTime(1, block, remainingBlock, w_red);
//   setRedTime(2, block, remainingBlock, s_red);
//   setRedTime(3, block, remainingBlock, e_red);

//   time--;
//   if (time <= 0) time = 40;
// }

// // Activate green/yellow
// function activate(green, yellow, red, remaining) {

//   red.style.opacity = 0.2;

//   if (remaining > 2) {
//     green.style.opacity = 1;
//     green.innerText = remaining - 2;   // 8 sec green
//   } else {
//     yellow.style.opacity = 1;
//     yellow.innerText = remaining;      // 2 sec yellow
//   }
// }

// // Calculate red time correctly
// function setRedTime(index, currentBlock, remainingBlock, redLight) {

//   if (index === currentBlock) return; // skip active

//   let diff = index - currentBlock;
//   if (diff <= 0) diff += 4;

//   let redTime = (diff * 10) - (10 - remainingBlock);

//   redLight.style.opacity = 1;
//   redLight.innerText = redTime;
// }

// // Reset lights
// function resetLights() {

//   let all = [
//     n_green, n_yellow, n_red,
//     w_green, w_yellow, w_red,
//     s_green, s_yellow, s_red,
//     e_green, e_yellow, e_red
//   ];

//   all.forEach(light => {
//     light.style.opacity = 0.2;
//     light.innerText = "";
//   });
// }
