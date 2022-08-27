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
let list = [
  {
    id: 1,
    name: "Banana",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
    expiryDate: "3 days left",
    additionalInfo: "Description",
  },
  {
    id: 2,
    name: "Banana",
    image: "https://i.imgur.com/ILEU18M.jpg",
    expiryDate: "10:30:29",
    additionalInfo: "Description",
  },
  {
    id: 3,
    name: "Microsoft Surface Pro",
    image: "https://i.imgur.com/ILEU18M.jpg",
    ram: "16GB",
    ssd: "512GB",
    price: "499",
  },
  {
    id: 4,
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

app.delete("/food/:id", (req, res) => {
  list = list.filter((l) => {
    return l.id !== parseInt(req.params.id);
  });
  res.status(200).json({ success: "true" });
});
app.listen(5001, () => console.log("Server started"));
