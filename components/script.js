const messageContainer = document.querySelector(".notes-container");
const createButton = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("proceed")[0];
const close = document.getElementsByClassName("close")[0];
const addNotesTextarea = document.getElementById("addNotes");
const fetchButton = document
  .getElementById("fetchBtn")
  .addEventListener("click", fetchJoke);

document.getElementById("delBtn").addEventListener("click", deleteJoke);

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
      messageContainer.insertBefore(messageBox, messageContainer.firstChild);
      messageBox.appendChild(paragraph);
      messageBox.appendChild(deleteIcon);
      // messageBox.appendChild(img);

      updateStorage();
      addNotesTextarea.value = "";
      modal.style.display = "none";
    } else {
      window.alert("Please add a note first before proceeding.");
    }
  });
messageContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("ph-backspace")) {
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
  // localStorage.removeItem("notes");
  modal.style.display = "none";
};

function toggleDark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

async function fetchJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    let data = null;

    if (response.ok) {
      // If successful, parse the JSON response
      data = await response.json();
      document.getElementById("jokeContainer").innerText = data.value;
    } else {
      // If not successful, throw an error with the status text
      throw new Error("Error fetching data: " + response.statusText);
    }
  } catch {
    alert("Error fetching data");
  }

  // Perform a GET request using fetch API
  // fetch("https://api.chucknorris.io/jokes/random")
  //   .then((response) => {
  //     // Check if the response is successful (status code between 200 and 299)
  //     if (response.ok) {
  //       // If successful, parse the JSON response
  //       return response.json();
  //     } else {
  //       // If not successful, throw an error with the status text
  //       throw new Error("Error fetching data: " + response.statusText);
  //     }
  //   })
  //   .then((data) => {
  //     // Display the fetched joke in the jokeContainer
  //     document.getElementById("jokeContainer").innerText = data.value;
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occurred during the fetch
  //     console.error("Fetch error:", error);
  //   });
}
function deleteJoke() {
  // Clear the jokeContainer text
  document.getElementById("jokeContainer").innerText = "";
}
