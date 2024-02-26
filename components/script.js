const messageContainer = document.querySelector(".notes-container");
const createButton = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("proceed")[0];
const close = document.getElementsByClassName("close")[0];
const addNotesTextarea = document.getElementById("addNotes");

//  function for show local notes
function showNotes() {
  messageContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// update function for notes
function updateStorage() {
  localStorage.setItem("notes", messageContainer.innerHTML);
}

// click to open modal function
createButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// back to top button
let myButton = document.getElementById("top-button");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// span.onclick = function () {
//   modal.style.display = "none";
// };

// input notes inside modal
document
  .querySelector(".modal-body .proceed")
  .addEventListener("click", function () {
    const noteContent = addNotesTextarea.value.trim();
    if (noteContent !== "") {
      const messageBox = document.createElement("div");
      const paragraph = document.createElement("p");
      // icon delete
      const deleteIcon = document.createElement("i");
      // const img = document.createElement("img");
      messageBox.className = "message-box";

      paragraph.textContent = noteContent;
      paragraph.setAttribute("contenteditable", "true");

      deleteIcon.className = "ph ph-backspace delete-icon";

      // img.src = "/assets/images/delete.png";
      messageContainer.appendChild(messageBox);
      messageBox.appendChild(paragraph);
      messageBox.appendChild(deleteIcon);
      // messageBox.appendChild(img);

      updateStorage();
      addNotesTextarea.value = "";
      modal.style.display = "none";
    } else {
      alert("Please add a note first before proceeding.");
    }
  });

messageContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("ph-backspace")) {
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
  localStorage.removeItem("notes");
  modal.style.display = "none";
};

function toggleDark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
