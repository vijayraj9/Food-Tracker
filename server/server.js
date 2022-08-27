const express = require("express");
const webpush = require("web-push");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());
webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

app.post("", (req, res) => {
  const subs = req.body;
  res.status(201).json({});

  webpush.sendNotification(subs, JSON.stringify({ title: "Test" }));
});
app.get("/api", (req, res) => {
  res.json({ user: ["1", "2", "3"] });
});

app.listen(5001, () => console.log("Server started"));
