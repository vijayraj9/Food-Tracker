const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
let list = [];
let id = 1;
app.get("/food", (req, res) => {
  res.json(list);
});

app.post("/food", (req, res) => {
  req.body.forEach((i) => {
    list.push({ id, ...i });
    id += 1;
  });
  res.status(200).json({ success: "true" });
});

app.delete("/food/:id", (req, res) => {
  list = list.filter((l) => {
    return l.id !== parseInt(req.params.id);
  });
  res.status(200).json({ success: "true" });
});

app.get("/notification/:time", async (req, res) => {
  const items = [];
  list.forEach((l) => {
    const time = Math.floor(
      (new Date(l.expiryDate) - new Date()) / (1000 * 86400)
    );
    if (time < parseInt(req.params.time)) {
      items.push({ id: l.id, name: l.name, time });
    }
  });
  res.json(items);
});

app.listen(5001, () => console.log("Server started"));
