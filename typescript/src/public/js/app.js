const expenseForm = document.getElementById("expenseForm");
const expensisListDiv = document.getElementById("expensisList");
const messageDiv = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn")
document.addEventListener("DOMContentLoaded" ,()=>{
    loadAllExpenses();
})

let editId= null;

expenseForm.addEventListener("submit" , async(e)=>{
    e.preventDefault();


    const expName = document.getElementById("expName").value;
    const amount = document.getElementById("amount").value;
    const expDate = document.getElementById("expDate").value;
    console.log(expDate+"EXPDATE");
    
     

     try {
        const url = editId? `/api/expense/${editId}` :"/api/expense";
        const method =editId ? "PUT" : "POST";

        const response = await fetch(url , {
            method: method,
            headers:{
                'Content-type':"application/json",
            },
            body: JSON.stringify({expName , amount:Number(amount) , expDate}),
        });


        const data = await response.json();

       console.log(data);

        if(response.ok){
            messageDiv.textContent = editId ? "expense updated successfully":"expense added successfully!";
            //load updated expenses
            loadAllExpenses();
            editId=null;

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
            <button class="updateBtn" dataId="${data.id}"> Edit </button>
            </td>
          </tr>
          `
    ).join("");
}


// Event delegation - attach listener to parent (tbody)

expensisListDiv.addEventListener('click', async(e)=>{

    //if click delete button
    if(e.target.classList.contains('deleteBtn')){
        
        const id = e.target.getAttribute('dataId');

        console.log("attribute id", id);

        if(!confirm("are you sure you want to delete expense")) return;

        try{
            const response = await fetch(`/api/expense/${id}`,{
                method:"DELETE",
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

    //if click on edit button
    if(e.target.classList.contains('updateBtn')){
        const id = e.target.getAttribute("dataId");
        await loadExpenseForEdit(id);

    }
})

async function loadExpenseForEdit(id){
    try{
        const response = await  fetch(`/api/expense/${id}`);
        const data = await response.json();

        if(response.ok){
            const expense= data.data[0];
            console.log(expense);

            document.getElementById("expName").value = expense.expense_name;
            document.getElementById("amount").value = expense.expense_amount;
            // document.getElementById("expDate").value = expense.expense_date;
            const expDateInput = document.getElementById("expDate");

const expDate = expDateInput.value
  ? expDateInput.value
  : expDateInput.valueAsDate
    ? expDateInput.valueAsDate.toISOString().split("T")[0]
    : "";
    console.log({ expDate });

            editId=expense.id;
            submitBtn.textContent = "Update Expense";
            messageDiv.textContent = "Editing expense...";
    } else {
      alert(data.message || "Failed to load expense");

        }

    }catch(err){
        console.log(err)
    }
}