const form = document.getElementById("posts");
const message = document.getElementById("hide-message");
const logout = document.getElementById("log-out");
const hideBtns = document.getElementById("hidden-btns");
form.addEventListener("click", (e) => {
  let child = e.target.parentElement;
  if (child.classList.contains("delete-post")) {
    let parent = child.parentElement.parentElement;
    console.log(parent);
    deletePost(parent.id);
    form.removeChild(parent);
  }
});
logout.addEventListener("click", () => {
  localStorage.setItem("Authentication", "false");
  localStorage.removeItem("User");
});
function checkAuthentication() {
  if (JSON.parse(localStorage.getItem("Authentication")) == true) {
    message.classList.add("hide");
    hideBtns.classList.remove("hide");
    form.classList.remove("hide");
  } else {
    message.classList.remove("hide");
    hideBtns.classList.add("hide");
    form.classList.add("hide");
  }
}
setInterval(checkAuthentication, 100);

document.addEventListener("DOMContentLoaded", async () => {
  getContent();
});

async function getContent() {
  let user = localStorage.getItem("User");
  let data = { user };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/getdata", options);
  let finalResult = await response.json();
  let counter = [];
  for (let i = 0; i < finalResult.length; i++) {
    counter.push(finalResult[i]["time"]);
  }
  let postTime = counter.sort((a, b) => b - a);
  let index = 0;
  let timeIndex = 0;
  while (index < postTime.length) {
    if (finalResult[timeIndex]["time"] == postTime[index]) {
      console.log(finalResult[timeIndex]["user"]);
      if (user == finalResult[timeIndex]["user"]) {
        form.innerHTML += `<div class='post' id="${finalResult[timeIndex]["_id"]}"><div class="post-content">
      <h1>${finalResult[timeIndex]["title"]}</h1>
      <hr />
      <br />
      <p class="post-text">
      ${finalResult[timeIndex]["text"]}
      </p>
      <br />
      <hr />
      <p class="author">${finalResult[timeIndex]["user"]}'s Post</p>
      <button class="delete-post" class="">
        <i class="far fa-trash-alt"></i>
      </button>
      <button class="edit-post" class="">
        <i class="fas fa-pencil-alt"></i>
      </button>
    </div></div>`;
      } else {
        form.innerHTML += `<div class='post' id="${finalResult[timeIndex]["_id"]}"><div class="post-content">
      <h1>${finalResult[timeIndex]["title"]}</h1>
      <hr />
      <br />
      <p class="post-text">
      ${finalResult[timeIndex]["text"]}
      </p>
      <br />
      <hr />
      <p class="author">${finalResult[timeIndex]["user"]}'s Post</p>
    </div></div>`;
      }
      timeIndex = 0;
      index++;
    } else {
      timeIndex++;
    }
  }
}
async function deletePost(id) {
  let data = { id };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/deletedata", options);
  let finalResutl = await response.json();
}
