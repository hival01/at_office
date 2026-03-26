let time, score, gridsize, timeInterval, highScore;

let gameoverFlag = 0;
highScore = localStorage.getItem("highScore");
if (!highScore) {
  highScore = 0;
}
document.getElementById("startbtn").addEventListener("click", () => {
  startGame();
});


document.getElementById("highScore").innerText = highScore;

function startGame() {
  gameoverFlag = 0;
  score = 0;
  gridsize = 2;
  document.getElementById("highScore").innerText = highScore;

  time = document.getElementById("inputTime").value || 10;

  clearInterval(timeInterval);
  timeInterval = setInterval(updatetimer, 1000);
  createGrid();
}
function createGrid() {
  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  grid.style.gridTemplateColumns = `repeat(${gridsize},1fr)`;

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const basecolor = `rgb(${r},${g},${b})`;
  const uniquecolor = `rgb(${r + 70},${g + 70},${b + 70})`;

  const uniqueIndex = Math.floor(Math.random() * (gridsize * gridsize));

  for (let i = 0; i < gridsize * gridsize; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = basecolor;
    if (!gameoverFlag) {
      if (i === uniqueIndex) {
        cell.style.backgroundColor = uniquecolor;
        cell.addEventListener("click", () => {
          score++;
          if (gridsize < 10) gridsize++;
          document.getElementById("score").innerText = score;
          createGrid();
        });
      } else {
        cell.addEventListener("click", () => {
          gameOver();
        });
      }
    } else {
      cell.style.pointerEvents = "none";
    }

    grid.appendChild(cell);
  }
}

function updatetimer() {
  time--;
  document.getElementById("time").innerText = time;

  if (time <= 0) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timeInterval);
  gameoverFlag = 1;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  alert(`game over , score is ${score}`);
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
   document.getElementById("score").innerText = 0;

}
