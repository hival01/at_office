let score ;
let gridSize;
let time;
let timeInterval;
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  highScore = 0;
}

let gameOverFlag = false; // Add this flag to track the game state
document.getElementById("highScore").innerText = highScore;
 
function startGame() {
  document.getElementById("highScore").innertext = highScore;
  score = 0;
  gridSize = 2;
  time = document.getElementById("time-input").value || 10;
  console.log(time);
  

  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = time;

  clearInterval(timeInterval);
  timeInterval = setInterval(updateTimer, 1000);
  createGrid();
}

//create grid and give color to it , at last if correct clicked increase the score , and size of grid
function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";


   grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
 
  // rendom color

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const baseColor = `rgb(${r} , ${g} , ${b})`;
  const uniqueColor = `rgb(${r + 70} , ${g + 70} , ${b + 70})`;

  const uniqueIndex = Math.floor(Math.random() * (gridSize * gridSize));

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = baseColor;
    if (!gameOverFlag) {
      if (i === uniqueIndex) {
        cell.style.backgroundColor = uniqueColor;
        cell.onclick = function () {
          score++;
          if (gridSize < 10) gridSize++;
          document.getElementById("score").innerText = score;
          createGrid();
        };
      } else {
        cell.onclick = function () {
          gameOver();
        };
      }
    } else {
      cell.style.pointerEvents = "none";
    }

    grid.appendChild(cell);
  }
}

function updateTimer() {
  time--;
  document.getElementById("time").innerText = time;
  if (time <= 0) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timeInterval);
  gameOverFlag = true;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("highScore").innerText = highScore;
  }
  alert(`game over! your score is: ${score}`);
}
