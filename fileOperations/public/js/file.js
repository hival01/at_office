const submitBtn = document.getElementById("submitBtn");
const inputFile = document.getElementById("inputFile");
const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");
const allUsers = document.getElementById("allUsers");

submitBtn.addEventListener("click", () => {
  const file = inputFile.files[0];
  console.log(inputFile.value);

  for (const key in file) {
    console.log(`${key} : ${file[key]}`);
  }
});

allUsers.addEventListener("click", () => {
  window.location.href = "/allUser";
});
