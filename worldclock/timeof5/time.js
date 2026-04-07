let time = document.getElementById("time");
let btn = document.getElementById("btn");
let timeDiv = document.getElementById("times");
let currBtn = document.getElementById("currBtn");
btn.addEventListener("click", ()=>{

    getTimes(time.value);
})

currBtn.addEventListener("click",()=>{
    getTimes();
})


function getTimes(time){
    const mydate =new Date();
    if(time){
        let hour = time.slice(0,2);
        let min = time.slice(3,5);
    
        mydate.setHours(hour,min,0,0);
    }

    let utcTime = mydate.toUTCString().slice(16,25);

    let x = Intl.supportedValuesOf("timeZone");
    timeDiv.innerHTML="";
    x.forEach(country_city =>{


        let countrytime = mydate.toLocaleTimeString("en-US",{
            timeZone:`${country_city}`
        })

        timeDiv.innerHTML+=`
        <p> ${country_city}</p>
        time: ${countrytime}
        `
    })
}