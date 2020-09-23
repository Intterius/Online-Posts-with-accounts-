const form = document.getElementById("submit-form");
const username = document.getElementById("username");
const pass = document.getElementById("password");
const confPass = document.getElementById("confirm-psw");
const formVisibility = document.getElementById("hidden-form");
const message = document.getElementById("success-message");
formVisibility.classList.remove("hide");
message.classList.add("hide");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (checkMatchPasswords());
  {
    let result = await getUser(username.value, pass.value);
    if (result == 404) {
      alert("Such user already exist, please select other username.");
    } else {
      formVisibility.classList.add("hide");
      message.classList.remove("hide");
      form.reset();
    }
  }
});
function checkMatchPasswords() {
  let validity = false;
  if (pass.value != confPass.value) {
    confPass.setCustomValidity("Passwords Don't Match");
  } else {
    validity = true;
    confPass.setCustomValidity("");
    return validity;
  }
}
pass.onchange = checkMatchPasswords;
confPass.onkeyup = checkMatchPasswords;

async function getUser(user, pswd) {
  let data = { user, pswd };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/authentication", options);
  let finalResult = await response.json();
  return finalResult;
}
