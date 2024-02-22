const messageContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".btn");

let notes = document.querySelectorAll(".message-box");

function showNotes() {
  messageContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();
function updateStorage() {
  localStorage.setItem("notes", messageContainer.innerHTML);
}

createButton.addEventListener("click", () => {
  let messageBox = document.createElement("div"); // Changed from 'p' to 'div'
  let paragraph = document.createElement("p"); // New element for the editable paragraph
  let img = document.createElement("img");
  messageBox.className = "message-box";

  paragraph.setAttribute("contenteditable", "true"); // Set contenteditable on the paragraph
  paragraph.textContent = ""; // Initialize the content with an empty string

  img.src = "/assets/images/delete.png";
  messageContainer.appendChild(messageBox);
  messageBox.appendChild(paragraph); // Append the paragraph to the messageBox
  messageBox.appendChild(img);
});

// createButton.addEventListener("click", () => {
//   let messageBox = document.createElement("p");
//   let img = document.createElement("img");
//   messageBox.className = "message-box";
//   messageBox.setAttribute("contenteditable", "true");

//   img.src = "/assets/images/delete.png";
//   messageContainer.appendChild(messageBox).appendChild(img);
// });

messageContainer.addEventListener("click", function (clk) {
  if (clk.target.tagName == "IMG") {
    clk.target.parentElement.remove();
    updateStorage();
  } else if (clk.target.tagName === "P") {
    notes = document.querySelectorAll(".message-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
