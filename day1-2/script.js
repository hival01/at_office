// let table= document.createElement("table");
// table.border=250;
// let headerRow = document.createElement("tr");

// let header = [ "name" , "age" , "country"];

// for(let i=0; i< header.length; i++){
//     let th = document.createElement("th");
//     th.textContent = header[i];
//     headerRow.appendChild(th);
// }


// table.appendChild(headerRow);

// let data= [
//     ["JOHN" , 20 , "USA"],
//     ["Anna", 2211, "Canada"],
//     ["Mike", 30, "UK"]
// ];


// for (let i=0; i<data.length; i++){
//     let row = document.createElement("tr");

//     for(let j=0; j<data[i].length; j++){
//         if(i=0){
//             row.style.color="blue";
//         }
//         let td = document.createElement("td");
//         td.textContent=data[i][j];
//         row.appendChild(td);
//     }
//     table.appendChild(row);
// }

// document.getElementById("table-container").appendChild(table);


// function sortTable() {
//     let table = document.querySelector("table");
//     let rows = Array.from(table.rows).slice(1);

//     rows.sort((a, b) => {
//         return a.cells[1].textContent - b.cells[1].textContent;
//     });

//     rows.forEach(row => table.appendChild(row));
// }



let table = document.createElement("table");
table.border = 2;
table.cellPadding=5;
table.cellSpacing=5;
table.align="center";
table.style.height="320px";
table.style.width= "560px";


let row = document.createElement("tr");

let th1 = document.createElement("th");
th1.textContent="Day";
th1.style.fontSize="50px";
th1.rowSpan=3;
row.appendChild(th1);

let th2= document.createElement("th");
th2.textContent="Seminar";
th2.colSpan=3;
row.appendChild(th2);

table.appendChild(row);



//second row
let row2 = document.createElement("tr");

let th3 = document.createElement("th");
th3.innerHTML="Schedule";
th3.colSpan=2;
row2.appendChild(th3);

let th4= document.createElement("th");
th4.innerHTML="Topic";
th4.rowSpan=2;
row2.appendChild(th4);

table.appendChild(row2);


//row3

let r3 = document.createElement("tr");

let th5 = document.createElement("th");

th5.innerHTML="Begin";
r3.appendChild(th5);


let th6 = document.createElement("th");
th6.innerHTML="End";
r3.appendChild(th6);

table.appendChild(r3);



//row4;

let r4 = document.createElement("tr");

let e1= document.createElement("td");
e1.innerHTML="Monday";
e1.rowSpan=2;
r4.appendChild(e1);

let e2= document.createElement("td");
e2.innerHTML="8 am"
e2.rowSpan=2;
r4.appendChild(e2);

let e3= document.createElement("td");
e3.innerHTML="5 pm";
e3.rowSpan=2;
r4.appendChild(e3);

let e4 = document.createElement("td");
e4.innerHTML="introduction to XML";
r4.appendChild(e4);

table.appendChild(r4);



//row 5

let r5 = document.createElement("tr");

let e6 = document.createElement("td");
e6.innerHTML="Validity DTD and relax NG";
r5.appendChild(e6);

table.appendChild(r5);



//row6 

let r6 = document.createElement("tr");

let e61= document.createElement("td");
e61.rowSpan=3;
e61.innerHTML="Tuesday";
r6.appendChild(e61);

let e62= document.createElement("td");
e62.innerHTML="8 am";
r6.appendChild(e62);

let e63= document.createElement("td");
e63.innerHTML="11 pm";
r6.appendChild(e63);

let e64= document.createElement("td");
e64.innerHTML="XPath";
r6.appendChild(e64);

table.appendChild(r6);



//row 7

let r7 = document.createElement("tr");

let e71 = document.createElement("td");
e71.innerHTML="11 am";
r7.appendChild(e71);

let e72 = document.createElement("td");
e72.innerHTML="2 pm";
r7.appendChild(e72);

let e73 = document.createElement("td");
e73.rowSpan=2;
e73.innerHTML="XSL Transformations";
r7.appendChild(e73);


table.appendChild(r7);

//row 8

let r8 = document.createElement("tr");

let e81 = document.createElement("td");
e81.innerHTML="2 pm ";
r8.appendChild(e81);

let e82 = document.createElement("td");
e82.innerHTML="5 pm";
r8.appendChild(e82);


table.appendChild(r8);

//row9 

let r9 = document.createElement("tr");

let e91= document.createElement("td");
e91.innerHTML="Wednesday";
r9.appendChild(e91);

let e92= document.createElement("td");
e92.innerHTML="8 am";
r9.appendChild(e92);

let e93= document.createElement("td");
e93.innerHTML="12 pm";
r9.appendChild(e93);


let e94 = document.createElement("td");
e94.innerHTML="XSL Formatting Objects";
r9.appendChild(e94);


table.appendChild(r9);



document.getElementById("table-container").appendChild(table);