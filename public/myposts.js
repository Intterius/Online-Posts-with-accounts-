const form = document.getElementById("posts");
const message = document.getElementById("hide-message");
const logout = document.getElementById("log-out");
const hideBtns = document.getElementById("hidden-btns");
form.addEventListener("click", (e) => {
  let child = e.target.parentElement;
  if (child.classList.contains("delete-post")) {
    let parent = child.parentElement.parentElement;
    deletePost(parent.id);
    form.removeChild(parent);
    let text = parent.getElementsByClassName("post-text")[0].innerHTML;
    let title = parent.firstElementChild.firstElementChild.innerHTML;
    let author = parent.getElementsByClassName("author")[0].innerHTML;
    //console.log(parent.firstElementChild.firstElementChild.innerHTML);
    //console.log(parent.firstElementChild);
  }
  /*if (child.classList.contains("edit-post")) {
    window.open(
      "addpost.html",
      "_blank" // <- This is what makes it open in a new window.
    );
  }*/
});
let el = Array.from(document.getElementsByClassName("author"));
el.map((e) => {});
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
  let final = await response.json();
  //let title = final[final.length - 1]["textcontent"][0]["title"];
  // let text = final[final.length - 1]["textcontent"][0]["text"];
  /*for (let i = 1; i < final.length + 1; i++) {
    console.log(final[final.length - i]["user"] == user);
  }*/
  /*for (let i = 0; i < final.length; i++) {
    if (final[i]["user"] == user) {
      form.innerHTML += `<div class='post' id="${final[i]["_id"]}"><div class="post-content">
    <h1>${final[i]["title"]}</h1>
    <hr />
    <br />
    <p class="post-text">
    ${final[i]["text"]}
    </p>
    <br />
    <hr />
    <p class="author">${final[i]["user"]}'s Post</p>
    <button class="delete-post" class="">
      <i class="far fa-trash-alt"></i>
    </button>
    <button class="edit-post" class="">
      <i class="fas fa-pencil-alt"></i>
    </button>
  </div></div>`;
    }
  }*/
  let counter = [];
  for (let i = 0; i < final.length; i++) {
    counter.push(final[i]["time"]);
  }
  let postTime = counter.sort((a, b) => b - a);
  let index = 0;
  let timeIndex = 0;
  while (index < postTime.length) {
    if (final[timeIndex]["time"] == postTime[index]) {
      console.log(final[timeIndex]["user"]);
      if (user == final[timeIndex]["user"]) {
        form.innerHTML += `<div class='post' id="${final[timeIndex]["_id"]}"><div class="post-content">
      <h1>${final[timeIndex]["title"]}</h1>
      <hr />
      <br />
      <p class="post-text">
      ${final[timeIndex]["text"]}
      </p>
      <br />
      <hr />
      <p class="author">${final[timeIndex]["user"]}'s Post</p>
      <button class="delete-post" class="">
        <i class="far fa-trash-alt"></i>
      </button>
      <button class="edit-post" class="">
        <i class="fas fa-pencil-alt"></i>
      </button>
    </div></div>`;
      }
      timeIndex = 0;
      index++;
    } else {
      timeIndex++;
    }
  }
  //console.log(final[final.length - 1]["user"] == user);
  // console.log([final[final.length - 1]["user"], title, text]);
}

async function deletePost(id) {
  let data = { id };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/deletedata", options);
  let final = await response.json();
}
