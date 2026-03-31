// const express = require("express");

const genderDiv = document.getElementById("gender");
const relationshipDiv = document.getElementById("relationship");
const stateDiv = document.getElementById("state");
const cityDiv = document.getElementById("city");

async function getGender() {
  const response = await fetch("/form/api/getGender");
  const data = await response.json();

  console.log(data);
genderDiv.innerHTML=`<label> Gender : </label>`
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
async function getState(){
    const response = await fetch("/form/api/getState");
    if(!response.ok) {console.log(`error in fetch getState`);
    }
    const data = await response.json();

    //make datalist tag and append option to it  
    //currently this is select tag , learn how to make datalist dynamically

    stateTag = document.createElement("select");
    stateTag.id = "statelist";

    //make disabled 1st option tag
      const option1 = document.createElement("option");
        option1.textContent = "select state ";
        option1.disabled=true;
        option1.selected=true;
      stateTag.appendChild(option1);
    
    data.forEach(e => {
        const option = document.createElement("option");
        option.value=e.optionName;
        option.textContent = e.optionName;

        stateTag.appendChild(option);        
    });
   
    stateTag.addEventListener("change" , getCity);

    //make label and input field

    const label = document.createElement("label");
    const input = document.createElement("input");
    label.htmlFor = "state"
    label.textContent ="State ";

    input.id="state";
    input.required=true;
    input.list="statelist";

    stateDiv.appendChild(label)
    // stateDiv.appendChild(input)
    stateDiv.appendChild(stateTag)
}

async function getCity(){
  //empty the div first if it have any child element
  
  while(cityDiv.firstChild){
    cityDiv.removeChild(cityDiv.firstChild)
  }
    
  let stateName = stateTag.value;
  console.log(`state name is ${`stateName`}`);
  
    const response = await fetch(`/form/api/getCity?state=${stateName}`);
    if(!response.ok){ console.log(`error on fetching getCity`);
    }
    const data = await response.json();

    const cityTag= document.createElement("select");
    cityTag.id="city";

    //make disabled 1st option tag
      const option1 = document.createElement("option");
        option1.textContent = "select City ";
        option1.disabled=true;
        option1.selected=true;
      cityTag.appendChild(option1);

    //add other options
    data.forEach(e=>{
        const option = document.createElement("option");
        option.value=e.optionName;
        option.textContent= e.optionName;

        cityTag.appendChild(option);
    })

    const label = document.createElement('label');
    label.htmlFor="city";
    label.textContent="City " 

    cityDiv.appendChild(label);
    cityDiv.appendChild(cityTag);
}




getGender();
getRelationship();
getState();