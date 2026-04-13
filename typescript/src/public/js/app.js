const expenseForm = document.getElementById("expenseForm");
const expensisListDiv = document.getElementById("expensisList");


document.addEventListener("DOMContentLoaded" ,()=>{
    loadAllExpenses();
})



expenseForm.addEventListener("submit" , async(e)=>{
    e.preventDefault();


    const expName = document.getElementById("expName").value;
    const amount = document.getElementById("amount").value;
    const expDate = document.getElementById("expDate").value;
     const messageDiv = document.getElementById("message");

     try {
        const response = await fetch("/api/expense" , {
            method:"post",
            headers:{
                'Content-type':"application/json",
            },
            body: JSON.stringify({expName , amount , expDate}),
        });


        const data = await response.json();

       console.log(data);

        if(response.ok){
            messageDiv.textContent ="expense added successfully!"
            //load updated expenses
            loadAllExpenses();

        }else{
            console.log("response is not ok...");
            messageDiv.textContent = data.message || "fail to add expense";

        }
     } catch (error) {
            messageDiv.textContent = "error occure" + error.message;

     }
    
})


//load all exepenses

async function loadAllExpenses(){
    try{

        const response = await fetch("/api/expense/allexpense");
        if(!response.ok){
            console.error("error fetching the all exe")
        }else{
            const daresultData  = await response.json();  
            console.log(daresultData.data);
            
            showAllExpenses(daresultData.data);
        }
    }catch(err){
        console.log('Error loading expenses:', err);
    }
}

function showAllExpenses(expenses){
    expensisListDiv.innerHTML = expenses.map((data)=>
         `<tr>
            <td>
            <strong>${data.expense_name}</strong>
             </td>
            <td> 
            <strong>${data.expense_amount}</strong>
            </td>
            <td> 
            <strong>Date: ${data.expense_date}</strong>
            </td>
            <td>
            <button class ="deleteBtn" dataId = "${data.id}"> Delete</button>
            </td>
          </tr>
          `
    ).join("");
}


// Event delegation - attach listener to parent (tbody)

expensisListDiv.addEventListener('click', async(e)=>{
    if(e.target.classList.contains('deleteBtn')){
        
        const id = e.target.getAttribute('dataId');

        console.log("attribute id", id);

        if(!confirm("are you sure you want to delete expense")) return;

        try{
            const response = await fetch(`/api/expense/${id}`,{
                method:"delete",
            })

            const data = await response.json();

            if(response.ok){
                console.log("expense is deleted");
                loadAllExpenses();

            }else{
                alert(data.message ||"fail to delete exp");
            }
        }catch(err){
            console.log(err);
        }
    }
})