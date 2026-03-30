
const genderDiv = document.getElementById("gender");
const relationshipDiv = document.getElementById("relationship");

async function getGender(){
const response = await fetch("/form/api/getGender");
const data = await response.json();

console.log(data);

data.forEach(element => {
    console.log(element.optionId);
    genderDiv.innerHTML+=`<label for="${element.optionName}">${element.optionName}</label>  <input type="radio" name="gender" id="${element.optionName}">`
});
};

async function getRelationship(){
    const response = await fetch("/form/api/getRelationship");
    const data = await response.json();
    console.log(relationshipDiv);
    
    relationshipDiv.innerHTML+=`<label for="relationship">relationship</label>  <select name="relationship" id ="relationship"> </select>`

    const selectR = document.getElementById("relationship");

    data.forEach(e=>{
        //add logic to insert options in relationship select tag

        // relationshipDiv.innerHTML+=`<option value="${e.optionName}"> ${e.optionName}</option>`
        // selectR.appendChild()
    })
    
    console.log(relationshipDiv);

}


getGender();
getRelationship();