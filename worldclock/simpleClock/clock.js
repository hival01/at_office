let india = document.getElementById("india");
let tokyo = document.getElementById("tokyo");
let newYork = document.getElementById("newYork");
let london = document.getElementById("london");
let australia = document.getElementById("australia")

setInterval(updateTime, 1000);
updateTime();
function updateTime() {
  let date = new Date();
  india.innerHTML = `<h1> india </h1>`;
  india.innerHTML += date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    
  });

  london.innerHTML=`<h1> London</h1>`;
  london.innerHTML+= date.toLocaleTimeString("en-US",{
    timeZone :"Europe/london"
  })

  tokyo.innerHTML = `<h1> TOKYO </h1>`;
  tokyo.innerHTML += date.toLocaleTimeString("en-US", {
    timeZone:"Asia/Tokyo"
  });

  newYork.innerHTML = `<h1> New York </h1>`;
  newYork.innerHTML += date.toLocaleTimeString("en-US", {
    timeZone:"America/new_york"
  });


  australia.innerHTML = `<h1> australia </h1>`;
  australia.innerHTML += date.toLocaleTimeString("en-US", {
    timeZone:"Australia/sydney"
  });
}





