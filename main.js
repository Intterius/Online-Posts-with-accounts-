const express = require("express");
const app = express();
const Datastore = require("nedb");
const database = new Datastore("database.db");
const postData = new Datastore("posts.db");
postData.loadDatabase();
database.loadDatabase();
app.listen(3000, () => console.log("success"));
app.use("/", express.static(__dirname + "/public"));
app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/sign.html");
});
let userName;
let userPass;
app.post("/authentication", (req, res) => {
  let info = req.body;
  userName = info.user;

  database.find({ user: userName }, (err, data) => {
    if (data.length == 0) {
      database.insert(info);
      res.json(data);
    } else {
      console.log(data);
      res.json("404");
    }
  });
});

app.post("/data", (req, res) => {
  let info = req.body;
  userName = info.user;
  userPass = info.pswd;

  database.find({ user: userName, pswd: userPass }, (err, data) => {
    if (err) {
      res.end();
      return;
    }

    res.json(data);
  });
});
app.post("/postcontent", (req, res) => {
  postData.insert(req.body);
  res.json(req.body);
});

app.post("/getdata", (req, res) => {
  let info = req.body;
  userName = info.user;
  postData.find({}, (err, data) => {
    res.json(data);
  });
});
app.post("/deletedata", (req, res) => {
  let info = req.body;

  postData.find({ _id: info.id }, (err, data) => {
    postData.remove({ _id: data[0]["_id"] }, {}, function (err, numRemoved) {});
  });
  res.json();
});
