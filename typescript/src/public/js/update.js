// const goHome = document.getElementById("goHome");
const updateBtn = document.getElementById("updateBtn");
const messageDiv = document.getElementById("message")

// goHome.addEventListener("click", ()=>{
//      window.location ="http://localhost:3001/api/expense";
// })


updateBtn.addEventListener("click" , async(e)=>{
    let editId = updateBtn.getAttribute("data-id");
     
    e.preventDefault();


    const expName = document.getElementById("expName").value;
    const amount = document.getElementById("amount").value;
    const expDate = document.getElementById("expDate").value;
    console.log(expDate+"EXPDATE");

     try {
        const response = await fetch(`/api/expense/${editId}` , {
            method: "put",
            headers:{
                'Content-type':"application/json",
            },
            body: JSON.stringify({expName , amount:Number(amount) , expDate}),
        });

        const data = await response.json();

       console.log(data);

        if(response.ok){
            messageDiv.textContent = "expense updated successfully";
            setTimeout(()=>{
                window.location.href="/api/expense";
            },1000)
                
        }else{
            console.log("response is not ok...");
            messageDiv.textContent = data.message || "fail to add expense";
        }
     } catch (error) {
            messageDiv.textContent = "error occure" + error.message;

     }
    
})