const genderDiv = document.getElementById("gender");
const relationshipDiv = document.getElementById("relationship");
const stateDiv = document.getElementById("state");
const cityDiv = document.getElementById("city");
const eduBody = document.getElementById("eduBody");
const addEduBtn = document.getElementById("addEduBtn");
const workExpBody = document.getElementById("workExpBody");
const addExpBtn = document.getElementById("addExpBtn");
const langBody = document.getElementById("langBody");
const addLangBtn = document.getElementById("addLangBtn");
const techBody = document.getElementById("techBody");
const addTechBtn = document.getElementById("addTechBtn")


async function getGender() {
  const response = await fetch("/form/api/getGender");
  const data = await response.json();

  console.log(data);
  genderDiv.innerHTML = `<label> Gender : </label>`;
  data.forEach((element) => {
    console.log(element.optionId);
    genderDiv.innerHTML += `
    <input type="radio" name="gender" id="${element.optionName}">
    <label for="${element.optionName}">${element.optionName}</label>`;
  });
}

async function getRelationship() {
  const response = await fetch("/form/api/getRelationship");
  const data = await response.json();

  const selectTag = document.createElement("select");
  selectTag.name = "relationship";
  selectTag.id = "relationship";

  data.forEach((e) => {
    //add logic to insert options in relationship select tag
    const option = document.createElement("option");
    option.value = e.optionName;
    option.textContent = e.optionName;

    selectTag.appendChild(option);
  });

  //add label for relationship
  const label = document.createElement("label");
  label.textContent = "relationship status ";
  label.htmlFor = "relationship"; //work as for property in html

  relationshipDiv.appendChild(label);
  relationshipDiv.appendChild(selectTag);
}

let stateTag;
async function getState() {
  const response = await fetch("/form/api/getState");
  if (!response.ok) {
    console.log(`error in fetch getState`);
  }
  const data = await response.json();

  //make datalist tag and append option to it
  //currently this is select tag , learn how to make datalist dynamically

  stateTag = document.createElement("select");
  stateTag.id = "statelist";

  //make disabled 1st option tag
  const option1 = document.createElement("option");
  option1.textContent = "select state ";
  option1.disabled = true;
  option1.selected = true;
  stateTag.appendChild(option1);

  data.forEach((e) => {
    const option = document.createElement("option");
    option.value = e.optionName;
    option.textContent = e.optionName;

    stateTag.appendChild(option);
  });

  stateTag.addEventListener("change", getCity);

  //make label and input field

  const label = document.createElement("label");
  const input = document.createElement("input");
  label.htmlFor = "state";
  label.textContent = "State ";

  input.id = "state";
  input.required = true;
  input.list = "statelist";

  stateDiv.appendChild(label);
  // stateDiv.appendChild(input)
  stateDiv.appendChild(stateTag);
}

async function getCity() {
  //empty the div first if it have any child element

  while (cityDiv.firstChild) {
    cityDiv.removeChild(cityDiv.firstChild);
  }

  let stateName = stateTag.value;
  console.log(`state name is ${stateName}`);

  const response = await fetch(`/form/api/getCity?state=${stateName}`);
  if (!response.ok) {
    console.log(`error on fetching getCity`);
  }
  const data = await response.json();

  const cityTag = document.createElement("select");
  cityTag.id = "city";

  //make disabled 1st option tag
  const option1 = document.createElement("option");
  option1.textContent = "select City ";
  option1.disabled = true;
  option1.selected = true;
  cityTag.appendChild(option1);

  //add other options
  data.forEach((e) => {
    const option = document.createElement("option");
    option.value = e.optionName;
    option.textContent = e.optionName;

    cityTag.appendChild(option);
  });

  const label = document.createElement("label");
  label.htmlFor = "city";
  label.textContent = "City ";

  cityDiv.appendChild(label);
  cityDiv.appendChild(cityTag);
}

function addEduRow() {
  const row = document.createElement("tr");

  //1st td - course
  const courseTd = createInputTd("text", "courses", true);
  row.appendChild(courseTd);

  //2nd td- passing year
  const passingYearTd = createInputTd("text", "passingYears", true);
  row.appendChild(passingYearTd);

  //3rd td - uni/board
  const uniTd = createInputTd("text", "unis", true);
  row.appendChild(uniTd);

  //4th td - result
  const resultTd = createInputTd("text", "results", true);
  row.appendChild(resultTd);

  //5th td - delete button
  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);

  eduBody.appendChild(row);
}


function addExpRow (){
  const row = document.createElement('tr');
  
  //1st col
  const compName = createInputTd("text" , "compName" , true);
  row.appendChild(compName);

  //2nd col from date
  const fromDate= createInputTd("date", "fromDate" , true);
  row.appendChild(fromDate);

  //3nd col to date
  const toDate= createInputTd("date", "toDate" , true);
  row.appendChild(toDate);

  //4th col annual package
  const annualPkg = createInputTd("text" , "annualPkg" , true);
  row.appendChild(annualPkg);

  const reasonToLeave = createInputTd("text" , "reasonToLeave" , true);
  row.appendChild(reasonToLeave);

  const refContactNo = createInputTd("text" , "refContactNo" , true);
  row.appendChild(refContactNo);


  const refContactName = createInputTd("text" , "refContactName" , true);
  row.appendChild(refContactName);

  const refContactRelation = createInputTd("text" , "refContactRelation" , true);
  row.appendChild(refContactRelation);

  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);
  

  workExpBody.appendChild(row);
}




//add row for languages
function addLangRow(){
  const row = document.createElement('tr');
  
  const langInput = createInputTd("text" , "languages" , true);
  row.appendChild(langInput);
  
  const checkbox1 = createInputTd("checkbox" , "canRead", false);
  row.appendChild(checkbox1);

  const checkbox2 = createInputTd("checkbox" , "canWrite", false);
  row.appendChild(checkbox2);
  
  const checkbox3 = createInputTd("checkbox" , "canSpeak", false);
  row.appendChild(checkbox3);
  
  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);
  
  langBody.appendChild(row);
}

function addTechRow(){
  const row = document.createElement('tr');
  const techInput = createInputTd("text" , "technologies" , true);
  row.appendChild(techInput);

  const radio1 = createInputTd("radio" , "beginer" , false);
  // radio1.childNodes().name="technology"
  row.appendChild(radio1);

  const radio2 = createInputTd("radio" , "intermediate" , false);
  // radio2.childNodes().name="technology"
  row.appendChild(radio2);

  const radio3 = createInputTd("radio" , "expert" , false);
  row.appendChild(radio3);

  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);


  techBody.appendChild(row);
}

function createInputTd(type, className, required) {
  const tdEle = document.createElement("td");

  const inputEle = document.createElement("input");

  inputEle.type = type;
  inputEle.className = className;
  inputEle.required = required;
  inputEle.style.margin = "3px 10px";
  tdEle.appendChild(inputEle);

  return tdEle;
}

function createDeleteTd() {
  const tdEle = document.createElement("td");

  const btn = document.createElement("button");
  btn.addEventListener("click", () => {
    let deleteTr = btn.closest("tr");
    deleteTr.parentElement.removeChild(deleteTr); //MUST USE removeChild , only remove will delete all the tr in the table
  });
  btn.innerText = "delete";
  btn.style.backgroundColor = "red"
  btn.style.color="white";

  tdEle.appendChild(btn);
  return tdEle;
}
//bind event to addEduBtn
addEduBtn.addEventListener("click", addEduRow);
addExpBtn.addEventListener("click" , addExpRow);
addLangBtn.addEventListener("click" , addLangRow);
addTechBtn.addEventListener("click" , addTechRow)



getGender();
getRelationship();
getState();
addEduRow();
addExpRow();
addLangRow();
addTechRow();





//submit form is remaining 

// document.getElementById('submitBtn').addEventListener("click" , async (e)=>{
//   e.preventDefault();
  
//   const data ={
//     firstName : document.getElementById("firstName").value
//   }
//   data.forEach(e=>{
//     console.log(e);
//   })

//   const formData = new FormData();
//     formData.append("firstname" , data)
  
  // try {
  //   const response = await fetch('form/api/submit', {
  //     method: 'POST',
  //     body: formData
  //   });
  //   console.log(await response.json());
  // } catch (error) {
  //   console.error('Error:', error);
  // }
// })
