const messageContainer = document.querySelector(".notes-container");
const createButton = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("proceed")[0];
const close = document.getElementsByClassName("close")[0];
const addNotesTextarea = document.getElementById("addNotes");
const fetchButton = document
  .getElementById("fetchBtn")
  .addEventListener("click", fetchJoke);

const searchInput = document.getElementById("searchInput");
const clearInput = document.getElementById("clearInput");

document.getElementById("delBtn").addEventListener("click", deleteJoke);
document.getElementById("searchBtn").addEventListener("click", searchJoke);

searchInput.addEventListener("input", function () {
  clearInput.style.display = this.value ? "block" : "none";
});

clearInput.addEventListener("click", () => {
  searchInput.value = "";
  clearInput.style.display = "none";
});
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
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
};

function topFunction() {
  document.documentElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

class NoteDateTime {
  static getCurrentDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return now.toLocaleDateString("en-SG", options);
  }
}

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
      const editIcon = document.createElement("i");
      const time = document.createElement("p");
      time.textContent = NoteDateTime.getCurrentDateTime();
      time.className = "timestamp";
      // const img = document.createElement("img");
      messageBox.className = "message-box";

      paragraph.textContent = noteContent;
      paragraph.setAttribute("contenteditable", "false");

      deleteIcon.className = "ph-fill ph-trash delete-icon";
      editIcon.className = "ph-fill ph-pencil edit-icon";

      editIcon.addEventListener("click", function () {
        paragraph.setAttribute("contenteditable", "true");
        paragraph.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        paragraph.addEventListener("keypress", function (event) {
          if (event.key == "Enter") {
            paragraph.setAttribute("contentEditable", "false");
            updateStorage();
          }
        });
      });
      messageContainer.insertBefore(messageBox, messageContainer.firstChild);
      messageBox.appendChild(time);
      messageBox.appendChild(paragraph);
      messageBox.appendChild(deleteIcon);
      messageBox.appendChild(editIcon);
      // messageBox.appendChild(img);

      updateStorage();
      addNotesTextarea.value = "";
      modal.style.display = "none";
    } else {
      window.alert("Please add a note first before proceeding.");
    }
  });
messageContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("ph-trash")) {
    event.target.parentElement.remove();
    updateStorage();
  }
});

addNotesTextarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".modal-body .proceed").click();
  }
});

close.onclick = function () {
  modal.style.display = "none";
};

function toggleDark() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  var icon = document.getElementById("darkModeIcon");
  if (element.classList.contains("dark-mode")) {
    icon.classList.remove("ph-moon");
    icon.classList.add("ph-sun-dim");
  } else {
    icon.classList.remove("ph-sun-dim");
    icon.classList.add("ph-moon");
  }
}

// Function to show the snackbar with a message
function snackBarMsg(message) {
  showSnackBar.innerHTML = message;
  showSnackBar.classList.add("show");
  setTimeout(function () {
    showSnackBar.className = showSnackBar.className.replace("show", "");
  }, 3000);
}

class DeleteNotes {
  static eraseAll() {
    if (window.confirm("Are you sure you want to erase ALL NOTES?")) {
      localStorage.removeItem("notes");
      messageContainer.innerHTML = localStorage.getItem("notes");
      snackBarMsg(
        '<i class="ph ph-check-circle"></i>' +
          " Successfully deleted all NOTES."
      );
      document.getElementById("showSnackBar").style.color = "green";
    }
  }
}

const eraseNote = document.getElementById("delete");
eraseNote.addEventListener("click", DeleteNotes.eraseAll);

async function fetchJokeByKeyword(keyword) {
  try {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(
        keyword
      )}`
    );

    if (response.ok) {
      const data = await response.json();

      if (data.result.length > 0) {
        document.getElementById("jokeContainer").innerHTML = "";
        data.result.forEach((joke) => {
          const jokeElement = document.createElement("p");
          const jokeText = joke.value;
          const highlightedJoke = jokeText.replaceAll(
            new RegExp(keyword, "gi"),
            `<span style="background-color: lightblue;">${keyword}</span>`
          );
          jokeElement.innerHTML = highlightedJoke;
          document.getElementById("jokeContainer").appendChild(jokeElement);
        });
      } else {
        snackBarMsg(
          '<i class="ph ph-warning-circle"></i>' +
            " No jokes found matching the keyword."
        );
        document.getElementById("showSnackBar").style.color = "red";
        // alert("No jokes found matching the keyword.");
      }
    } else {
      throw new Error("Error fetching data: " + response.statusText);
    }
  } catch (error) {
    alert("Error fetching data: " + error);
  }
}

// Call fetchJokeByKeyword with the search keyword
async function searchJoke() {
  const searchKeyword = document.getElementById("searchInput").value.trim();

  if (searchKeyword === "") {
    snackBarMsg(
      ' <i class="ph ph-warning-circle"></i>' +
        " Please enter a search keyword."
    );
    document.getElementById("showSnackBar").style.color = "red";
    // alert("Please enter a search keyword.");
    return;
  }

  await fetchJokeByKeyword(searchKeyword);
}

async function fetchJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    let data = null;
    if (response.ok) {
      data = await response.json();
      document.getElementById("jokeContainer").innerText = data.value;
    } else {
      throw new Error("Error fetching data: " + response.statusText);
    }
  } catch {
    alert("Error fetching data");
  }
}

function deleteJoke() {
  document.getElementById("jokeContainer").innerText = "";
}
