const genderDiv = document.getElementById("gender");
const relationshipDiv = document.getElementById("relationship");
const stateDiv = document.getElementById("state");
const cityDiv = document.getElementById("city");
const preferredLocationDiv1 = document.getElementById("preferredLocation1");
const preferredLocationDiv2 = document.getElementById("preferredLocation2");
const departmentDiv = document.getElementById("department");

const eduBody = document.getElementById("eduBody");
const workExpBody = document.getElementById("workExpBody");
const langBody = document.getElementById("langBody");
const techBody = document.getElementById("techBody");

function makeDeleteButton(onDelete) {
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Delete";
  btn.addEventListener("click", onDelete);
  td.appendChild(btn);
  return td;
}

function inputCell(type, name, required = true) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.required = required;
  td.appendChild(input);
  return td;
}

function addEduRow() {
  const row = document.createElement("tr");
  const i = eduBody.children.length;
  row.appendChild(inputCell("text", `education[${i}][courseName]`));
  row.appendChild(inputCell("text", `education[${i}][passingYear]`));
  row.appendChild(inputCell("text", `education[${i}][uniBoard]`));
  row.appendChild(inputCell("text", `education[${i}][result]`));
  row.appendChild(makeDeleteButton(() => row.remove()));
  eduBody.appendChild(row);
}

function addWorkRow() {
  const row = document.createElement("tr");
  const i = workExpBody.children.length;
  row.appendChild(inputCell("text", `workExperience[${i}][compName]`));
  row.appendChild(inputCell("date", `workExperience[${i}][fromDate]`));
  row.appendChild(inputCell("date", `workExperience[${i}][toDate]`));
  row.appendChild(inputCell("text", `workExperience[${i}][annualPackage]`));
  row.appendChild(inputCell("text", `workExperience[${i}][reasonToLeave]`));
  row.appendChild(inputCell("text", `workExperience[${i}][refContactNo]`));
  row.appendChild(inputCell("text", `workExperience[${i}][refContactName]`));
  row.appendChild(inputCell("text", `workExperience[${i}][refContactRelation]`));
  row.appendChild(makeDeleteButton(() => row.remove()));
  workExpBody.appendChild(row);
}

function addLangRow() {
  const row = document.createElement("tr");
  const i = langBody.children.length;
  row.appendChild(inputCell("text", `languages[${i}][languageName]`));
  ["canRead", "canWrite", "canSpeak"].forEach((k) => {
    const td = document.createElement("td");
    const c = document.createElement("input");
    c.type = "checkbox";
    c.name = `languages[${i}][${k}]`;
    td.appendChild(c);
    row.appendChild(td);
  });
  row.appendChild(makeDeleteButton(() => row.remove()));
  langBody.appendChild(row);
}

function addTechRow() {
  const row = document.createElement("tr");
  const i = techBody.children.length;
  row.appendChild(inputCell("text", `technologies[${i}][techName]`));
  const td = document.createElement("td");
  const select = document.createElement("select");
  select.name = `technologies[${i}][expLevel]`;
  select.required = true;
  ["beginner", "intermediate", "expert"].forEach((l) => {
    const option = document.createElement("option");
    option.value = l;
    option.textContent = l;
    select.appendChild(option);
  });
  td.appendChild(select);
  row.appendChild(td);
  row.appendChild(makeDeleteButton(() => row.remove()));
  techBody.appendChild(row);
}

function createSelect(name, options) {
  const selectTag = document.createElement("select");
  selectTag.name = name;
  selectTag.required = name !== "location2";
  const ph = document.createElement("option");
  ph.value = "";
  ph.disabled = true;
  ph.selected = true;
  ph.textContent = "Select";
  selectTag.appendChild(ph);
  options.forEach((e) => {
    const option = document.createElement("option");
    option.value = e.optionName;
    option.textContent = e.optionName;
    selectTag.appendChild(option);
  });
  return selectTag;
}

async function getGender() {
  const data = await fetch("/api/getGender").then((r) => r.json());
  genderDiv.innerHTML = `<label>Gender : </label>`;
  data.forEach((element) => {
    genderDiv.innerHTML += `<input type="radio" name="gender" value="${element.optionName}" required><label>${element.optionName}</label>`;
  });
}

async function getRelationship() {
  const data = await fetch("/api/getRelationship").then((r) => r.json());
  relationshipDiv.innerHTML = "<label>Relationship status </label>";
  relationshipDiv.appendChild(createSelect("relationship", data));
}

let stateTag;
async function getState() {
  const data = await fetch("/api/getState").then((r) => r.json());
  stateTag = createSelect("state", data);
  stateDiv.innerHTML = "<label>State </label>";
  stateDiv.appendChild(stateTag);
  stateTag.addEventListener("change", getCity);
}

async function getCity() {
  const data = await fetch(`/api/getCity?state=${encodeURIComponent(stateTag.value)}`).then((r) => r.json());
  cityDiv.innerHTML = "<label>City </label>";
  cityDiv.appendChild(createSelect("city", data));
}

async function getPrefLocation() {
  const locations = await fetch("/api/getPrefLocation").then((r) => r.json());
  preferredLocationDiv1.appendChild(createSelect("location1", locations));
  preferredLocationDiv2.appendChild(createSelect("location2", locations));
}

async function getPrefDepartment() {
  const data = await fetch("/api/getPrefDepartment").then((r) => r.json());
  departmentDiv.appendChild(createSelect("department", data));
}

document.getElementById("addEduBtn").addEventListener("click", (e) => { e.preventDefault(); addEduRow(); });
document.getElementById("addExpBtn").addEventListener("click", (e) => { e.preventDefault(); addWorkRow(); });
document.getElementById("addLangBtn").addEventListener("click", (e) => { e.preventDefault(); addLangRow(); });
document.getElementById("addTechBtn").addEventListener("click", (e) => { e.preventDefault(); addTechRow(); });

getGender();
getRelationship();
getState();
getPrefLocation();
getPrefDepartment();
addEduRow();
addWorkRow();
addLangRow();
addTechRow();
