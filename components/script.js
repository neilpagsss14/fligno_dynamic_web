const messageContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".btn");

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let notes = document.querySelectorAll(".message-box");

function showNotes() {
  messageContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();
function updateStorage() {
  localStorage.setItem("notes", messageContainer.innerHTML);
}

createButton.addEventListener("click", () => {
  let messageBox = document.createElement("div");
  let paragraph = document.createElement("p");
  let img = document.createElement("img");
  messageBox.className = "message-box";

  paragraph.setAttribute("contenteditable", "true");
  paragraph.textContent = "";

  img.src = "/assets/images/delete.png";
  messageContainer.appendChild(messageBox);
  messageBox.appendChild(paragraph);
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
