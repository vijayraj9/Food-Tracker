const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const list = [
  {
    name: "Banana",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
    expiryDate: "3 days left",
    additionalInfo: "Description",
  },
  {
    name: "Banana",
    image: "https://i.imgur.com/ILEU18M.jpg",
    expiryDate: "10:30:29",
    additionalInfo: "Description",
  },
  {
    name: "Microsoft Surface Pro",
    image: "https://i.imgur.com/ILEU18M.jpg",
    ram: "16GB",
    ssd: "512GB",
    price: "499",
  },
  {
    name: "Banana",
    image: "https://i.imgur.com/ILEU18M.jpg",
    expiryDate: "10:30:29",
    additionalInfo: "Description",
  },
];
app.get("/food", (req, res) => {
  res.json(list);
});

app.post("/food", (req, res) => {
  list.push(req.body);
});
app.listen(5001, () => console.log("Server started"));
