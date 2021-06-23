document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.getElementById("isFinished");
  let isFinished = false;
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      isFinished = true;
      checkbox.value = "true";
    } else {
      isFinished = false;
      checkbox.value = "false";
    }
  });
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (isFinished === false || isFinished === "false") {
      addBookToUnfinished();
    } else if (isFinished === true || isFinished === "true") {
      addBookToFinished();
    }
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
