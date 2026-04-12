const submitBtn = document.getElementById("submitBtn");
const inputFile = document.getElementById("inputFile");
const allUsers = document.getElementById("allUsers");

if (submitBtn && inputFile) {
  submitBtn.addEventListener("click", () => {
    const file = inputFile.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  });
}

if (allUsers) {
  allUsers.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/allUser";
  });
}
