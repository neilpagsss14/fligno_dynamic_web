const messageContainer = document.querySelector(".notes-container");
const createButton = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("proceed")[0];
const close = document.getElementsByClassName("close")[0];
const addNotesTextarea = document.getElementById("addNotes");

function showNotes() {
  messageContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", messageContainer.innerHTML);
}

createButton.addEventListener("click", () => {
  modal.style.display = "block";
});

span.onclick = function () {
  modal.style.display = "none";
};

document
  .querySelector(".modal-body .proceed")
  .addEventListener("click", function () {
    const noteContent = addNotesTextarea.value.trim();
    if (noteContent !== "") {
      const messageBox = document.createElement("div");
      const paragraph = document.createElement("p");
      const img = document.createElement("img");
      messageBox.className = "message-box";

      paragraph.textContent = noteContent;
      paragraph.setAttribute("contenteditable", "true");

      img.src = "/assets/images/delete.png";
      messageContainer.appendChild(messageBox);
      messageBox.appendChild(paragraph);
      messageBox.appendChild(img);

      updateStorage();
      addNotesTextarea.value = "";
      modal.style.display = "none";
    } else {
      alert("Please add a note first before proceeding.");
    }
  });

messageContainer.addEventListener("click", function (event) {
  if (event.target.tagName == "IMG") {
    event.target.parentElement.remove();
    updateStorage();
  }
});

addNotesTextarea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".modal-body .proceed").click();
  }
});

close.onclick = function () {
  modal.style.display = "none";
};

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
