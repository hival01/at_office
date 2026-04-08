const user = window.userdata || {};
const steps = Array.from(document.querySelectorAll(".step-fieldset"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const stepValidationMessage = document.getElementById("stepValidationMessage");
let currentStep = 0;

function showStep(i) {
  steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
  prevBtn.style.display = i === 0 ? "none" : "inline-block";
  nextBtn.style.display = i === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = i === steps.length - 1 ? "inline-block" : "none";
  stepValidationMessage.textContent = "";
}

function validateCurrentStep() {
  const fields = steps[currentStep].querySelectorAll("input, select");
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

function makeDeleteButton(onDelete) {
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Delete";
  btn.addEventListener("click", onDelete);
  td.appendChild(btn);
  return td;
}

function createInputCell(type, name, value = "", required = true) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.required = required;
  input.value = value || "";
  td.appendChild(input);
  return td;
}

function renderEducationRow(item = {}) {
  const tbody = document.getElementById("eduBody");
  const row = document.createElement("tr");
  const idx = tbody.children.length;
  row.appendChild(createInputCell("text", `education[${idx}][courseName]`, item.courseName));
  row.appendChild(createInputCell("text", `education[${idx}][passingYear]`, item.passingYear));
  row.appendChild(createInputCell("text", `education[${idx}][uniBoard]`, item.uniBoard));
  row.appendChild(createInputCell("text", `education[${idx}][result]`, item.result));
  row.appendChild(makeDeleteButton(() => row.remove()));
  tbody.appendChild(row);
}

function renderWorkRow(item = {}) {
  const tbody = document.getElementById("workBody");
  const row = document.createElement("tr");
  const idx = tbody.children.length;
  row.appendChild(createInputCell("text", `workExperience[${idx}][compName]`, item.compName));
  row.appendChild(createInputCell("date", `workExperience[${idx}][fromDate]`, item.fromDate ? String(item.fromDate).slice(0, 10) : ""));
  row.appendChild(createInputCell("date", `workExperience[${idx}][toDate]`, item.toDate ? String(item.toDate).slice(0, 10) : ""));
  row.appendChild(createInputCell("text", `workExperience[${idx}][annualPackage]`, item.annualPackage));
  row.appendChild(createInputCell("text", `workExperience[${idx}][reasonToLeave]`, item.reasonToLeave));
  row.appendChild(createInputCell("text", `workExperience[${idx}][refContactNo]`, item.refContactNo));
  row.appendChild(createInputCell("text", `workExperience[${idx}][refContactName]`, item.refContactName));
  row.appendChild(createInputCell("text", `workExperience[${idx}][refContactRelation]`, item.refContactRelation));
  row.appendChild(makeDeleteButton(() => row.remove()));
  tbody.appendChild(row);
}

function renderLanguageRow(item = {}) {
  const tbody = document.getElementById("langBody");
  const row = document.createElement("tr");
  const idx = tbody.children.length;
  row.appendChild(createInputCell("text", `languages[${idx}][languageName]`, item.languageName));
  ["canRead", "canWrite", "canSpeak"].forEach((key) => {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = `languages[${idx}][${key}]`;
    input.checked = Boolean(item[key]);
    td.appendChild(input);
    row.appendChild(td);
  });
  row.appendChild(makeDeleteButton(() => row.remove()));
  tbody.appendChild(row);
}

function renderTechRow(item = {}) {
  const tbody = document.getElementById("techBody");
  const row = document.createElement("tr");
  const idx = tbody.children.length;
  row.appendChild(createInputCell("text", `technologies[${idx}][techName]`, item.techName));

  const td = document.createElement("td");
  const select = document.createElement("select");
  select.name = `technologies[${idx}][expLevel]`;
  select.required = true;
  ["beginner", "intermediate", "expert"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    if (String(item.expLevel || "").toLowerCase() === level) option.selected = true;
    select.appendChild(option);
  });
  td.appendChild(select);
  row.appendChild(td);
  row.appendChild(makeDeleteButton(() => row.remove()));
  tbody.appendChild(row);
}

function buildSelect(mountId, name, labelText, options, selectedValue, required = true) {
  const mount = document.getElementById(mountId);
  mount.innerHTML = "";
  const label = document.createElement("label");
  label.textContent = labelText;
  const select = document.createElement("select");
  select.name = name;
  select.required = required;
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "Select";
  ph.disabled = true;
  ph.selected = !selectedValue;
  select.appendChild(ph);
  options.forEach((o) => {
    const op = document.createElement("option");
    op.value = o.optionName;
    op.textContent = o.optionName;
    if (selectedValue === o.optionName) op.selected = true;
    select.appendChild(op);
  });
  mount.appendChild(label);
  mount.appendChild(select);
  return select;
}

async function loadStaticDropdowns() {
  const [g, r, s, l, d] = await Promise.all([
    fetch("/api/getGender").then((x) => x.json()),
    fetch("/api/getRelationship").then((x) => x.json()),
    fetch("/api/getState").then((x) => x.json()),
    fetch("/api/getPrefLocation").then((x) => x.json()),
    fetch("/api/getPrefDepartment").then((x) => x.json()),
  ]);

  const genderBlock = document.getElementById("genderBlock");
  genderBlock.innerHTML = "<label>Gender</label><br/>";
  g.forEach((item) => {
    const id = `g_${item.optionName}`;
    genderBlock.innerHTML += `<input type="radio" name="gender" id="${id}" value="${item.optionName}" ${user.basic.gender === item.optionName ? "checked" : ""} required><label for="${id}">${item.optionName}</label>`;
  });

  buildSelect("relationshipBlock", "relationship", "Relationship", r, user.basic.relationship, true);
  const stateSelect = buildSelect("stateBlock", "state", "State", s, user.basic.state, true);
  buildSelect("preferredLocation1Block", "location1", "Preferred Location 1", l, user.preference.location1, true);
  buildSelect("preferredLocation2Block", "location2", "Preferred Location 2", l, user.preference.location2, false);
  buildSelect("departmentBlock", "department", "Department", d, user.preference.department, true);

  async function loadCities() {
    const cities = await fetch(`/api/getCity?state=${encodeURIComponent(stateSelect.value)}`).then((x) => x.json());
    buildSelect("cityBlock", "city", "City", cities, user.basic.city, true);
  }
  stateSelect.addEventListener("change", loadCities);
  if (user.basic.state) await loadCities();
}

document.getElementById("addEduBtn").addEventListener("click", () => renderEducationRow());
document.getElementById("addWorkBtn").addEventListener("click", () => renderWorkRow());
document.getElementById("addLangBtn").addEventListener("click", () => renderLanguageRow());
document.getElementById("addTechBtn").addEventListener("click", () => renderTechRow());

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    showStep(currentStep);
  }
});
nextBtn.addEventListener("click", () => {
  if (!validateCurrentStep()) {
    stepValidationMessage.textContent = "Please complete this step first.";
    return;
  }
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    showStep(currentStep);
  }
});

document.getElementById("updateForm").addEventListener("submit", (e) => {
  if (!validateCurrentStep()) {
    e.preventDefault();
    stepValidationMessage.textContent = "Please complete required fields before submit.";
  }
});

async function init() {
  showStep(0);
  await loadStaticDropdowns();
  (user.education || []).forEach(renderEducationRow);
  (user.workExperience || []).forEach(renderWorkRow);
  (user.languages || []).forEach(renderLanguageRow);
  (user.technologies || []).forEach(renderTechRow);
  if (!(user.education || []).length) renderEducationRow();
  if (!(user.workExperience || []).length) renderWorkRow();
  if (!(user.languages || []).length) renderLanguageRow();
  if (!(user.technologies || []).length) renderTechRow();
}

init();
