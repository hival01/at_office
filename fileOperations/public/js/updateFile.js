const submitBtn = document.getElementById("submitBtn");
const inputFile = document.getElementById("inputFile");
const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");
const allUsers = document.getElementById("allUsers");
const id = document.getElementById("id");

submitBtn.addEventListener("click", async () => {
  const file = inputFile.files[0];
  console.log(inputFile.value);

  for (const key in file) {
    console.log(`${key} : ${file[key]}`);
  }

  const data = await fetch(`/delete/${id}`);
  const data2 = await data.json();
  console.log(data2);
  
});

allUsers.addEventListener("click", () => {
  window.location.href = "/allUser";
});