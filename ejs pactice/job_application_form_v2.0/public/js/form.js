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
const addTechBtn = document.getElementById("addTechBtn");
const preferredLocationDiv1 = document.getElementById("preferredLocation1");
const preferredLocationDiv2 = document.getElementById("preferredLocation2");
const departmentDiv = document.getElementById("department");



async function getGender() {
  const response = await fetch("/api/getGender");
  const data = await response.json();

  console.log(data);
  genderDiv.innerHTML = `<label> Gender : </label>`;
  data.forEach((element) => {
    genderDiv.innerHTML += `
    <input type="radio" name="gender" id="${element.optionName}" value="${element.optionName}">
    <label for="${element.optionName}">${element.optionName}</label>`;
  });
}

async function getRelationship() {
  const response = await fetch("/api/getRelationship");
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
  const response = await fetch("/api/getState");
  if (!response.ok) {
    console.log(`error in fetch getState`);
  }
  const data = await response.json();

  //make datalist tag and append option to it
  //currently this is select tag , learn how to make datalist dynamically

  stateTag = document.createElement("select");
  stateTag.id = "statelist";
  stateTag.name="state";

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

  const response = await fetch(`/api/getCity?state=${stateName}`);
  if (!response.ok) {
    console.log(`error on fetching getCity`);
  }
  const data = await response.json();

  const cityTag = document.createElement("select");
  cityTag.id = "city";
  cityTag.name="city";

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
  const courseTd = createInputTd("text", "courses", true,"courses");
  row.appendChild(courseTd);

  //2nd td- passing year
  const passingYearTd = createInputTd("text", "passingYears", true,  "passingYears");
  row.appendChild(passingYearTd);

  //3rd td - uni/board
  const uniTd = createInputTd("text", "unis", true, "unis");
  row.appendChild(uniTd);

  //4th td - result
  const resultTd = createInputTd("text", "results", true, "results");
  row.appendChild(resultTd);

  //5th td - delete button
  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);

  eduBody.appendChild(row);
}


function addExpRow (){
  const row = document.createElement('tr');
  
  //1st col
  const compName = createInputTd("text" , "compName" , true, "compName");
  row.appendChild(compName);

  //2nd col from date
  const fromDate= createInputTd("date", "fromDate" , true , "fromDate");
  row.appendChild(fromDate);

  //3nd col to date
  const toDate= createInputTd("date", "toDate" , true , "toDate");
  row.appendChild(toDate);

  //4th col annual package
  const annualPkg = createInputTd("text" , "annualPkg" , true ,"annualPkg");
  row.appendChild(annualPkg);

  const reasonToLeave = createInputTd("text" , "reasonToLeave" , true ,"reasonToLeave");
  row.appendChild(reasonToLeave);

  const refContactNo = createInputTd("text" , "refContactNo" , true ,"refContactNo");
  row.appendChild(refContactNo);


  const refContactName = createInputTd("text" , "refContactName" , true , "refContactName");
  row.appendChild(refContactName);

  const refContactRelation = createInputTd("text" , "refContactRelation" , true ,"refContactRelation");
  row.appendChild(refContactRelation);

  const deleteTd = createDeleteTd();
  row.appendChild(deleteTd);
  

  workExpBody.appendChild(row);
}



let lang_count=-1;

//add row for languages
function addLangRow(){

  lang_count++;
  console.log(`after add counter ${lang_count}`);

  const row = document.createElement('tr');
  
  const langInput = createInputTd("text" , "languages" , true, "languages");
  row.appendChild(langInput);
  
  const checkbox1 = createInputTd("checkbox" , "canRead", false ,"canRead"); 
  row.appendChild(checkbox1);

  const checkbox2 = createInputTd("checkbox" , "canWrite", false , "canWrite");
  row.appendChild(checkbox2);
  
  const checkbox3 = createInputTd("checkbox" , "canSpeak", false ,"canSpeak");
  row.appendChild(checkbox3);
  
  const deleteTd = createDeleteTd("lang_count");
  row.appendChild(deleteTd);
  
  langBody.appendChild(row);
}

let tech_counte=-1;
function addTechRow(){

  tech_counte++;
  console.log(`after add counter ${tech_counte}`);

  const row = document.createElement('tr');
  const techInput = createInputTd("text" , "technologies" , true, "technologies");
  row.appendChild(techInput);

  const radio1 = createInputTd("radio" , "beginer" , false , "beginer");
  // radio1.childNodes().name="technology"
  row.appendChild(radio1);

  const radio2 = createInputTd("radio" , "intermediate" , false ,"intermediate");
  // radio2.childNodes().name="technology"
  row.appendChild(radio2);

  const radio3 = createInputTd("radio" , "expert" , false, "expert");
  row.appendChild(radio3);

  const deleteTd = createDeleteTd("tech_counte");
  row.appendChild(deleteTd);


  techBody.appendChild(row);
}

function createInputTd(type, className, required, fieldName) {
  const tdEle = document.createElement("td");

  const inputEle = document.createElement("input");

  inputEle.type = type;
  inputEle.className = className;
  inputEle.required = required;
  inputEle.style.margin = "3px 10px";
  
  if( 
        (className ==="languages" ) 
        || (type==="checkbox" && (className==="canRead" || className==="canWrite" || className==="canSpeak"))
      ){
        inputEle.name= `languages[${lang_count}][${fieldName}]`;
  }
  else if( className === "technologies"){
        inputEle.name=`technologies[${tech_counte}][technologies]`;
  }
  else if(type==="radio" && (className==="beginer" || className==="intermediate" || className==="expert")){
        inputEle.name=`technologies[${tech_counte}][level]`;
        inputEle.value=fieldName;
  }
  else{
    inputEle.name = fieldName+"[]";
  }

  tdEle.appendChild(inputEle);
  return tdEle;
}

function createDeleteTd(counterName) {
  const tdEle = document.createElement("td");

  const btn = document.createElement("button");
  btn.addEventListener("click", () => {
    if(counterName==="lang_count"){
      if(lang_count<0){
        alert("no rows to delete");
        return;
      }else{
        lang_count--;
        console.log(`after decriment the lang_count is ${lang_count}`);
      }
    }else if(counterName==="tech_counte"){
      if(tech_counte<0){
        alert("no rows to delete");
        return;
      }else{
        tech_counte--;
        console.log(`after decriment the tech_counte is ${tech_counte}`);
      }
    }else if(!counterName || counterName===null){
      console.log(`no counter needed for this`);
      
    }
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


//preferred location functions

async function getPrefLocation(){
  
  const response = await fetch("/api/getPrefLocation");
  if(!response.ok){
    console.log(`response is not ok in getPrefLocation`);
  } 
  const locations = await response.json();

  const location1= createSelect("location1", locations);
  const location2= createSelect("location2", locations);

  preferredLocationDiv1.appendChild(location1);
  preferredLocationDiv2.appendChild(location2);
}

async function getPrefDepartment(){
  const response = await fetch("/api/getPrefDepartment");
  if(!response.ok){
    console.log(`response is not ok in getPrefDepartment`);
  }
  const data = await response.json();

  const departmentSelect = createSelect("department" , data);
  departmentDiv.appendChild(departmentSelect);
}


function createSelect(name , options){
  const selectTag = document.createElement('select');
  
  selectTag.name=name;
  options.forEach(e=>{
    const option = document.createElement('option');
    option.textContent = e.optionName;
    selectTag.appendChild(option);
  });

  return selectTag;
}

getGender();
getRelationship();
getState();
addEduRow();
addExpRow();
addLangRow();
addTechRow();
getPrefLocation()
getPrefDepartment();




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
