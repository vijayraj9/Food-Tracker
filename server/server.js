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
    expiryDate: "August 28, 2022 01:24:30",
    additionalInfo: "Knock knock, banana",
  },
  {
    id: 2,
    name: "Apple",
    image: "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
    expiryDate: "August 28, 2022 01:24:30",
    additionalInfo: "Apple doesnt infact keep the doctor away",
  },
  {
    id: 3,
    name: "Milk",
    image:
      "https://images.squarespace-cdn.com/content/v1/60271465598ca61a670b27b0/1613185767567-V8ES6QEAM94EJ8JUL3RM/Camperdown+Fresh+Low+Fat+Milk+2L.png",
    expiryDate: "August 27, 2022 03:24:00",
    additionalInfo: "Milk will get frothy when spoilt",
  },
  {
    id: 4,
    name: "Carrot",
    image:
      "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/carrots_commodity-page.png",
    expiryDate: "August 27, 2022 03:24:00",
    additionalInfo: "Carrot is good for eyes",
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

app.get("/notification/:time", (req, res) => {
  const items = [];
  list.forEach((l) => {
    const time = (new Date() - new Date(l.expiryDate)) / 1000;
    if (time < parseInt(req.params.time)) {
      items.push({ id: l.id, name: l.name, time });
    }
  });
  res.json(items);
});

app.listen(5001, () => console.log("Server started"));
