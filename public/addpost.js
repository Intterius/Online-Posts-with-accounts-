const formVisibility = document.getElementById("form-size");
const submitForm = document.getElementById("form-add-post");
const logout = document.getElementById("log-out");
const warningText = document.getElementById("hide-message");
const userTitlte = document.getElementById("title-input-place");
const userContent = document.getElementById("info-input-place");
submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  postContent(userTitlte.value, userContent.value);
  submitForm.reset();
  alert("Post Added");
});

logout.addEventListener("click", () => {
  localStorage.setItem("Authentication", "false");
  localStorage.removeItem("User");
});

function checkAuthentication() {
  if (JSON.parse(localStorage.getItem("Authentication")) == true) {
    formVisibility.classList.remove("hide");
    logout.classList.remove("hide");
    warningText.classList.add("hide");
  } else {
    warningText.classList.remove("hide");
    formVisibility.classList.add("hide");
    logout.classList.add("hide");
  }
}
setInterval(checkAuthentication, 100);

async function postContent(title, text) {
  let date = new Date();
  let time = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
  );
  let user = localStorage.getItem("User");
  let data = { title, text, user, time };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/postcontent", options);
  let finalResult = await response.json();
}
