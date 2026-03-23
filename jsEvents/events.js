// let table = document.getElementById("table-body");

// let cells = [];
// for (let i = 0; i < 5; i++) {
//   let row = document.createElement("tr");
//   cells[i] = [];
//   for (let j = 0; j < 5; j++) {
//     let cell = document.createElement("td");
//     cell.id = `cell_${i}_${j}`;
//     cell.innerText = `cell ${i} ${j}`;

//     cells[i][j] = cell;
//     row.appendChild(cell);
//   }
//   table.appendChild(row);
// }

// // cell 0 0 click event

// cells[0][0].innerText = "click me";
// cells[0][0].addEventListener("click", () => {
//   if (cells[0][0].innerText === "you clicked me") {
//     cells[0][0].style.color = "black";
//     cells[0][0].innerText = "clicked me";
//     cells[0][0].style.backgroundColor = "white";
//   } else {
//     cells[0][0].innerText = "you clicked me";
//     cells[0][0].style.backgroundColor = "blue";
//     cells[0][0].style.color = "white";
//   }
// });

// // cell 0 1 bouble click event

// cells[0][1].innerText = "double click me";
// cells[0][1].addEventListener("dblclick", () => {
//   if (cells[0][1].innerText === "you double clicked me") {
//     cells[0][1].style.color = "black";
//     cells[0][1].innerText = "double clicked me";
//     cells[0][1].style.backgroundColor = "white";
//   } else {
//     cells[0][1].innerText = "you double clicked me";
//     cells[0][1].style.backgroundColor = "pink";
//   }
// });

// // cell 0 2 mousedown and mouseup event

// cells[0][2].innerText = "press the mouse";
// cells[0][2].addEventListener("mousedown", () => {
//   cells[0][2].innerText = "mouse is down";
//   cells[0][2].style.backgroundColor = "yellow";
// });

// cells[0][2].addEventListener("mouseup", () => {
//   cells[0][2].style.color = "black";
//   cells[0][2].innerText = "mouse is up";
//   cells[0][2].style.backgroundColor = "white";
// });

// //cell 0 3 mousemove
// cells[0][3].innerText = "move mouse in me";
// cells[0][3].addEventListener("mousemove", () => {
//   cells[0][3].style.backgroundColor = "green";
//   cells[0][3].innerText = "mousemove even is called!!";
// });

// //cell 0 4 mouseenter  , mouseleave
// let timeoutId = null;

// cells[0][4].innerText = "enter mouse in me";
// cells[0][4].addEventListener("mouseenter", () => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//     timeoutId = null;
//   }
//   cells[0][4].style.backgroundColor = "red";
//   cells[0][4].innerText = "mouseenter is called!!";
// });

// cells[0][4].addEventListener("mouseleave", () => {
//   mouseenter_flag = false;
//   cells[0][4].style.backgroundColor = "purple";
//   cells[0][4].innerText = "mouseleave is called!!";

//   timeoutId = setTimeout(() => {
//     cells[0][4].innerText = "enter mouse in me";
//     cells[0][4].style.backgroundColor = "white";
//   }, 2000);
// });

// //cell 1 0 contextmenu
// cells[1][0].innerText = "right click me";
// cells[1][0].addEventListener("contextmenu", () => {
//   cells[1][0].style.backgroundColor = "red";
//   cells[1][0].innerText = "contextmenu is called!!";
// });

// //cell 1 1 wheel
// cells[1][1].innerText = "scroll mouse wheel in me";
// cells[1][1].addEventListener("wheel", () => {
//   cells[1][1].style.backgroundColor = "orange";
//   cells[1][1].style.borderRadius = "60%";
//   cells[1][1].innerText = "wheel - mouse wheel scored in cell!!";
// });



let table = document.getElementById("table-body");

let cells = [];
for (let i = 0; i < 5; i++) {
  let row = document.createElement("tr");
  cells[i] = [];
  for (let j = 0; j < 5; j++) {
    let cell = document.createElement("td");
    cell.id = `cell_${i}_${j}`;
    cell.innerText = `cell ${i} ${j}`;

    cell.style.border = "1px solid black";
    cell.style.padding = "20px";
    cell.style.textAlign = "center";

    cells[i][j] = cell;
    row.appendChild(cell);
  }
  table.appendChild(row);
}

/* ---------- YOUR EVENTS (UNCHANGED) ---------- */

// click
cells[0][0].innerText = "click me";
cells[0][0].addEventListener("click", () => {
  if (cells[0][0].innerText === "you clicked me") {
    cells[0][0].style.color = "black";
    cells[0][0].innerText = "click me";
    cells[0][0].style.backgroundColor = "white";
  } else {
    cells[0][0].innerText = "you clicked me";
    cells[0][0].style.backgroundColor = "blue";
    cells[0][0].style.color = "white";
  }
});

// double click
cells[0][1].innerText = "double click me";
cells[0][1].addEventListener("dblclick", () => {
  cells[0][1].style.backgroundColor = "pink";
  cells[0][1].innerText = "double click triggered";
});

// mousedown + mouseup
cells[0][2].innerText = "press mouse";
cells[0][2].addEventListener("mousedown", () => {
  cells[0][2].innerText = "mouse down";
  cells[0][2].style.backgroundColor = "yellow";
});

cells[0][2].addEventListener("mouseup", () => {
  cells[0][2].innerText = "mouse up";
  cells[0][2].style.backgroundColor = "white";
});

// mousemove
cells[0][3].innerText = "move mouse";
cells[0][3].addEventListener("mousemove", () => {
  cells[0][3].innerText = "mousemove detected";
  cells[0][3].style.backgroundColor = "green";
});

// mouseenter + mouseleave


cells[0][4].innerText = "enter mouse in me";
cells[0][4].addEventListener("mouseenter", () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  cells[0][4].style.backgroundColor = "red";
  cells[0][4].innerText = "mouseenter is called!!";
});

cells[0][4].addEventListener("mouseleave", () => {
  mouseenter_flag = false;
  cells[0][4].style.backgroundColor = "purple";
  cells[0][4].innerText = "mouseleave is called!!";

  timeoutId = setTimeout(() => {
    cells[0][4].innerText = "enter mouse in me";
    cells[0][4].style.backgroundColor = "white";
  }, 2000);

});



// contextmenu
cells[1][0].innerText = "right click";
cells[1][0].addEventListener("contextmenu", (e) => {
  e.preventDefault();
  cells[1][0].style.backgroundColor = "red";
  cells[1][0].innerText = "right click detected";
});

// wheel
cells[1][1].innerText = "scroll wheel";
cells[1][1].addEventListener("wheel", () => {
  cells[1][1].style.backgroundColor = "orange";
  cells[1][1].innerText = "wheel event";
});

/* ---------- NEW IMPORTANT EVENTS ---------- */

// mouseover
cells[1][2].innerText = "mouseover";
cells[1][2].addEventListener("mouseover", () => {
  cells[1][2].style.backgroundColor = "lightblue";
  cells[1][2].innerText = "mouseover triggered";
});

// mouseout
cells[1][3].innerText = "mouseout";
cells[1][3].addEventListener("mouseout", () => {
  cells[1][3].style.backgroundColor = "lightgreen";
  cells[1][3].innerText = "mouseout triggered";
});

// keydown
cells[1][4].innerText = "press keyboard key";
document.addEventListener("keydown", (e) => {
  cells[1][4].innerText = "keydown: " + e.key;
  cells[1][4].style.backgroundColor = "cyan";
});

// keyup
cells[2][0].innerText = "release key";
document.addEventListener("keyup", (e) => {
  cells[2][0].innerText = "keyup: " + e.key;
  cells[2][0].style.backgroundColor = "lightyellow";
});

// input event
cells[2][1].innerHTML = `<input id="inputBox" placeholder="type here">`;

document.getElementById("inputBox").addEventListener("input", (e) => {
  cells[2][1].style.backgroundColor = "pink";
  console.log("input:", e.target.value);
});

// change event
cells[2][2].innerHTML = `
<select id="selectBox">
<option>A</option>
<option>B</option>
<option>C</option>
</select>
`;

document.getElementById("selectBox").addEventListener("change", (e) => {
  cells[2][2].style.backgroundColor = "violet";
  cells[2][2].innerText = "changed to " + e.target.value;
});

// focus
cells[2][3].innerHTML = `<input id="focusBox" placeholder="focus me">`;

document.getElementById("focusBox").addEventListener("focus", () => {
  cells[2][3].style.backgroundColor = "lightgreen";
});

// blur
document.getElementById("focusBox").addEventListener("blur", () => {
  cells[2][3].style.backgroundColor = "white";
});

// copy
cells[2][4].innerText = "copy this text";
cells[2][4].addEventListener("copy", () => {
  cells[2][4].style.backgroundColor = "orange";
  cells[2][4].innerText = "text copied!";
});

// paste
cells[3][0].innerHTML = `<input id="pasteBox" placeholder="paste here">`;

document.getElementById("pasteBox").addEventListener("paste", () => {
  cells[3][0].style.backgroundColor = "lightblue";
});

// dragstart
cells[3][1].innerText = "drag me";
cells[3][1].draggable = true;

cells[3][1].addEventListener("dragstart", () => {
  cells[3][1].style.backgroundColor = "gray";
});

// dragover
cells[3][2].innerText = "drag over here";

cells[3][2].addEventListener("dragover", (e) => {
  e.preventDefault();
  cells[3][2].style.backgroundColor = "yellow";
});

// drop
cells[3][2].addEventListener("drop", () => {
  cells[3][2].innerText = "item dropped";
  cells[3][2].style.backgroundColor = "green";
});

// scroll
cells[3][3].innerText = "scroll page";
window.addEventListener("scroll", () => {
  cells[3][3].style.backgroundColor = "pink";
  cells[3][3].innerText = "scroll detected";
});

// resize
cells[3][4].innerText = "resize window";

window.addEventListener("resize", () => {
  cells[3][4].style.backgroundColor = "lightcoral";
  cells[3][4].innerText = "window resized";
});



// // cell 4 0  -> touchstart (mobile mainly but good to know)
// cells[4][0].innerText = "touch start";
// cells[4][0].addEventListener("touchstart", () => {
//   cells[4][0].style.backgroundColor = "lightblue";
//   cells[4][0].innerText = "touch started";
// });

// // cell 4 1 -> touchend
// cells[4][1].innerText = "touch end";
// cells[4][1].addEventListener("touchend", () => {
//   cells[4][1].style.backgroundColor = "lightgreen";
//   cells[4][1].innerText = "touch ended";
// });

// // cell 4 2 -> pointerdown
// cells[4][2].innerText = "pointer down";
// cells[4][2].addEventListener("pointerdown", () => {
//   cells[4][2].style.backgroundColor = "orange";
//   cells[4][2].innerText = "pointerdown event";
// });

// // cell 4 3 -> pointerup
// cells[4][3].innerText = "pointer up";
// cells[4][3].addEventListener("pointerup", () => {
//   cells[4][3].style.backgroundColor = "purple";
//   cells[4][3].style.color = "white";
//   cells[4][3].innerText = "pointerup event";
// });

// // cell 4 4 -> window load event
// cells[4][4].innerText = "page load event";

// window.addEventListener("load", () => {
//   cells[4][4].style.backgroundColor = "gold";
//   cells[4][4].innerText = "window loaded!";
// });


// cell 4 0 -> dragenter
cells[4][0].innerText = "drag enter here";
cells[4][0].addEventListener("dragenter", () => {
  cells[4][0].style.backgroundColor = "lightblue";
  cells[4][0].innerText = "dragenter event!";
});

// cell 4 1 -> dragleave
cells[4][1].innerText = "drag leave here";
cells[4][1].addEventListener("dragleave", () => {
  cells[4][1].style.backgroundColor = "lightcoral";
  cells[4][1].innerText = "dragleave event!";
});

// cell 4 2 -> submit event
cells[4][2].innerHTML = `
<form id="demoForm">
<button type="submit">Submit</button>
</form>
`;

document.getElementById("demoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  cells[4][2].style.backgroundColor = "yellow";
  cells[4][2].innerText = "form submitted!";
});

// cell 4 3 -> beforeunload
cells[4][3].innerText = "try leaving page";

window.addEventListener("beforeunload", () => {
  cells[4][3].style.backgroundColor = "orange";
  cells[4][3].innerText = "leaving page!";
});

// cell 4 4 -> DOMContentLoaded
cells[4][4].innerText = "waiting DOM load";

document.addEventListener("DOMContentLoaded", () => {
  cells[4][4].style.backgroundColor = "lightgreen";
  cells[4][4].innerText = "DOM fully loaded!";
});