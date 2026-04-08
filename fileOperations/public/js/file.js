const submitBtn = document.getElementById("submitBtn");

const inputFile = document.getElementById("inputFile");

// submitBtn.addEventListener("submit" , ()=>{
    
// })
console.log("hiii");

submitBtn.addEventListener('click', ()=>{

    const file = inputFile.files[0];
    console.log(inputFile.value);
    
    for( const key in file){
        console.log( `${key} : ${file[key]}`);
    }   

})
