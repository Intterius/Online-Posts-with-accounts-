const hideForm = document.getElementById("hidden-form");
const formSubmit = document.getElementById("submit-form");
const btns = document.getElementById("hidden-btn");
const message = document.getElementById("success-message");
const logout = document.getElementById("log-out");
const username = document.getElementById("username");
const pass = document.getElementById("password");
formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  // getUser(username.value, pass.value);
  // getData(username.value, pass.value);
  let result = await getData(username.value, pass.value);
  if (result) {
    localStorage.setItem("Authentication", "true");
    localStorage.setItem("User", username.value);
    formSubmit.reset();
  } else {
    alert("You introduced a wrong username or password, please try again.");
  }
});
logout.addEventListener("click", () => {
  localStorage.setItem("Authentication", "false");
  localStorage.removeItem("User");
  message.classList.add("hide");
  btns.classList.add("hide");
  hideForm.classList.remove("hide");
});
function checkAuthentication() {
  if (JSON.parse(localStorage.getItem("Authentication")) == true) {
    message.classList.remove("hide");
    btns.classList.remove("hide");
    hideForm.classList.add("hide");
  } else {
    message.classList.add("hide");
    btns.classList.add("hide");
    hideForm.classList.remove("hide");
  }
}
setInterval(checkAuthentication, 100);

/*async function getUser(user, pswd) {
  let data = { user, pswd };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/authentication", options);
  let final = await response.json();
}*/

async function getData(user, pswd) {
  let data = { user, pswd };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/data", options);
  let final = await response.json();

  if (final.length == 1) {
    return true;
  } else {
    return false;
  }
}
