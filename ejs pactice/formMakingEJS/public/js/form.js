//logic for education section

let edu_table = document.getElementById("education");

let add_edu = document.getElementById("add-edu");
let remove_edu = document.getElementById("remove-edu");

let edu_cnt = 2;
add_edu.addEventListener("click", () => {
  edu_cnt++;
  let row = edu_table.insertRow(-1);
  row.innerHTML = `
                    <td>
                       <input type="text" id="course${edu_cnt}" name="course${edu_cnt}">
                    </td>
                    <td>
                       <input type="text" id="passingyear${edu_cnt}" name="passingyear${edu_cnt}">
                    </td>
                    <td>
                        <input type="text" id="uni${edu_cnt}" name="uni${edu_cnt}">
                    </td>
                    <td>
                        <input type="text" id="result${edu_cnt}" name="result${edu_cnt}">
                    </td>
    `;
});

remove_edu.addEventListener("click", () => {
  if (edu_cnt <= 0) {
    alert("no education is there");
    return;
  }
  edu_cnt--;
  edu_table.deleteRow(-1);
});

//logic for experence section

let exp_table = document.getElementById("experience");

let add_exp = document.getElementById("add-exp");
let remove_exp = document.getElementById("remove-exp");

let exp_cnt = 1;
add_exp.addEventListener("click", () => {
  exp_cnt++;

  let row = exp_table.insertRow(-1);
  row.innerHTML = `
        <td><input type="text" name="comp-name${exp_cnt}" id="comp-name${exp_cnt}" placeholder="eSparkBiz"></td>
        <td><input type="date" name="from-date${exp_cnt}" id="from-date${exp_cnt}"> </td>
        <td><input type="date" name="to-date${exp_cnt}" id="to-date${exp_cnt}"> </td>
        <td><input type="text" placeholder="1000000" name="package${exp_cnt}" id="package${exp_cnt}"></td>
        <td><input type="text" name="reason-to-leave${exp_cnt}" id="reason-to-leave${exp_cnt}"></td>
        <td><input type="text" id="contact-no${exp_cnt}" name="contact-no${exp_cnt}" placeholder="9876543219"></td>
        <td> <input type="text" name="name${exp_cnt}" id="name${exp_cnt}" placeholder="hival patel"></td>
        <td> <input type="text" name="relation${exp_cnt}" id="relation${exp_cnt}" placeholder="brother / friend"></td>

    `;
});

remove_exp.addEventListener("click", () => {
  if (exp_cnt <= 0) {
    alert("no experience is there");
    return;
  }

  exp_cnt--;
  exp_table.deleteRow(-1);
});

// ================= LANGUAGE SECTION =================


// language array
let languages = ["English", "Hindi", "Gujarati"];

let lang_table = document.getElementById("language");
let add_lang = document.getElementById("add-lang");
let remove_lang = document.getElementById("remove-lang");

let lang_cnt = 0;

// function to create datalist options
function getLanguageOptions(){
    return languages.map((lang)=>`<option value="${lang}"> </option>`).join("");
}


// function to create row
function createLanguageRow() {
  lang_cnt++;

  let row = lang_table.insertRow(-1);

  row.innerHTML = `
    <td>
        <input list="lang-list${lang_cnt}" id="language${lang_cnt}">
        <datalist id="lang-list${lang_cnt}">
            ${getLanguageOptions()}
        </datalist>
    </td>

    <td><input type="checkbox" name="read${lang_cnt}" id="read${lang_cnt}"></td>
    <td><input type="checkbox" name="write${lang_cnt}" id="write${lang_cnt}"></td>
    <td><input type="checkbox" name="speak${lang_cnt}" id="speak${lang_cnt}"></td>
  `;

  let input = document.getElementById(`language${lang_cnt}`);

  // check if new language entered
  input.addEventListener("change", () => {
    let value = input.value.trim();

    if (value !== "" && !languages.includes(value)) {
      languages.push(value); // add to array

      updateAllLanguageLists();
    }
  });
}

// update all dropdown lists
function updateAllLanguageLists() {
  for (let i = 1; i <= lang_cnt; i++) {
    let datalist = document.getElementById(`lang-list${i}`);

    if (datalist) {
      datalist.innerHTML = getLanguageOptions();
    }
  }
  console.log(languages);
}

// add row
add_lang.addEventListener("click", () => {
  createLanguageRow();
});

// remove row
remove_lang.addEventListener("click", () => {
  if (lang_cnt <= 1) {
    alert("No language left");
    return;
  }

  lang_cnt--;
  lang_table.deleteRow(-1);
});

// create first row automatically
createLanguageRow();





// ================= TECHNOLOGY SECTION =================

// technology array
let technologies = ["HTML", "CSS", "JavaScript"];

let tech_table = document.getElementById("technology");
let add_tech = document.getElementById("add-tech");
let remove_tech = document.getElementById("remove-tech");

let tech_cnt = 0;

function getTechnologyOptions(){
    return technologies.map((tech)=> `<option value=${tech}> </option>`).join("");
}

// create technology row
function createTechnologyRow() {

  tech_cnt++;

  let row = tech_table.insertRow(-1);

  row.innerHTML = `

    
    <td>
        <input list="tech-list${tech_cnt}" id="technology${tech_cnt}">
        <datalist id="tech-list${tech_cnt}">
            ${getTechnologyOptions()}
        </datalist>
    </td>

    <td>
        <input type="radio" name="level${tech_cnt}" value="Beginner" required>
    </td>

    <td>
        <input type="radio" name="level${tech_cnt}" value="Intermediate">
    </td>

    <td>
        <input type="radio" name="level${tech_cnt}" value="Expert">
    </td>
  `;

  let input = document.getElementById(`technology${tech_cnt}`);

  // check for new technology

  input.addEventListener("change",()=>{
    let value= input.value.trim();

    if(value!=="" && !technologies.includes(value)){
        technologies.push(value);
        updateAllTechnologyLists();
    }
  });
}


// update all datalists
function updateAllTechnologyLists() {

  for (let i = 1; i <= tech_cnt; i++) {

    let datalist = document.getElementById(`tech-list${i}`);

    if (datalist) {
      datalist.innerHTML = getTechnologyOptions();
    }

  }

}


// add row
add_tech.addEventListener("click", () => {
  createTechnologyRow();
});


// remove row
remove_tech.addEventListener("click", () => {

  if (tech_cnt <= 0) {
    alert("No technology left");
    return;
  }

  tech_cnt--;
  tech_table.deleteRow(-1);
});


// create first row automatically
createTechnologyRow();








// ================= PREFERENCES SECTION =================

// predefined arrays
let locations = ["Ahmedabad", "Surat", "Gandhinagar", "Rajkot"];

let departments = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "QA Testing",
  "HR"
];

// select elements
let location_select = document.getElementById("preferred-location");
let department_select = document.getElementById("department");


// populate location dropdown

locations.forEach( loc =>{
    let option = document.createElement("option");

    option.value=loc;
    option.textContent=loc;

    location_select.appendChild(option);
});


// populate department dropdown
departments.forEach(dep => {

  let option = document.createElement("option");

  option.value = dep;
  option.textContent = dep;

  department_select.appendChild(option);

});




let form = document.querySelector("form");

form.addEventListener("submit" , function(e){
    // e.preventDefault();

    validateform();
});


function validateform(){
    let isvalid=true;


    if(!validateBasicdetails()){
        isvalid=false;
    }
    if(!validateEducation()){
        isvalid=false;
    }

    if(!validateExperience()){
        isvalid=false;
    }

    if(!validateLanguage()){
        isvalid=false;
    }



    if(isvalid){
        alert("form submitted Successfully!!");
    }
}


function validateBasicdetails(){
    let firstname= document.getElementById("first-name");
    let lastname = document.getElementById("last-name");
    let email= document.getElementById("email")
    let phone= document.getElementById("ph-no")
    let zip= document.getElementById("zip")


    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;
    let zipPattern = /^[0-9]{6}$/;

    if(firstname.value.trim() ===""){
        alert("first name is required");
        return false;
    }
    if(lastname.value.trim() ===""){
        alert("last name is required");
        return false;
    }

    if(!emailPattern.test(email.value.trim())){
        alert("enter valid email");
        console.log(emailPattern.test(email));
        return false;
    }

    if(!zipPattern.test(zip.value.trim())){
        alert("enter valid zipcode");
        return false;
    }

    if(!phonePattern.test(phone.value.trim())){
        alert("enter valid phone number");
        return false;
    }
    return true;
}

function validateEducation(){
    
    for(let i=1; i<=edu_cnt; i++){
        let course = document.getElementById(`course${i}`);
        let passingyear = document.getElementById(`passingyear${i}`);
        let uni = document.getElementById(`uni${i}`);
        let result = document.getElementById(`result${i}`);

        if(course.value.trim()==="" ||
            passingyear.value.trim() === "" ||
            uni.value.trim() === "" ||
            result.value.trim() === ""
        ){
            alert("enter all field of education");
            return false;
        }

        if(result.value <0 || result.value >100){
            alert("enter result between 0 to 100");
            return false;
        }
        let currentYear= new Date().getFullYear();
        if(!(passingyear.value>= 1950 && passingyear.value<= currentYear)){
            alert(`enter the year between 1950 to ${currentYear}`);
            return false;
        }

    }
    return true;
}


function validateExperience(){

    for(let i=1; i<=exp_cnt; i++){
        let comp_name= document.getElementById(`comp-name${i}`);
        let from= document.getElementById(`from-date${i}`);
        let to= document.getElementById(`to-date${i}`);
        let package = document.getElementById(`package${i}`);
        let reason_to_leave = document.getElementById(`reason-to-leave${i}`);
        let ref_name= document.getElementById(`name${i}`);
        let ref_contact = document.getElementById(`contact-no${i}`);
        let ref_relation = document.getElementById(`relation${i}`);

        let phonePattern = /^[0-9]{10}$/;

        if(
            comp_name.value.trim() ===""||
            from.value ===""||
            to.value ===""||
            package.value.trim() ===""||
            reason_to_leave.value.trim() ===""||
            ref_name.value.trim() === ""||
            ref_contact.value.trim() === ""||
            ref_relation.value.trim() === ""
        ){
            alert("please enter all details of experience");
            return false;
        }

        if(new Date(from.value) > new Date(to.value) || new Date(to.value) > new Date() ){
            alert("enter proper date");
            return false;

        }
        console.log(package);
        console.log(ref_contact);
        
        
        if(isNaN(package.value)){
            alert("enter only numbers in package");
            return false;
        }
        if(!phonePattern.test(ref_contact.value)){
            alert("enter valid reference contact number");
            return false;
        }
    }   
    return true;
}


function validateLanguage(){

    let selectedLanguage=[];
    for(let i=1; i <= lang_cnt; i++){
        let language = document.getElementById(`language${i}`);

        if(!language) continue;

        let value = language.value.trim();

        if(value ===""){
            alert("select language");
            return false;
        }

        if(selectedLanguage.includes(value)){
            alert("duplicate not allowed");
            return false;
        }

        selectedLanguage.push(value);

        let read = document.getElementById(`read${i}`);
        let write = document.getElementById(`write${i}`);
        let speak = document.getElementById(`speak${i}`);
        console.log(read , write , speak);
        
        if(!read || !write || !speak){
            continue;
        }else if(!read.checked && !write.checked && !speak.checked){
            alert("any one skill must be checked");
            return false;
        }

    }
    return true;
}

