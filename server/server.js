const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ user: ["1", "2", "3"] });
});

app.listen(5001, () => console.log("Server started"));
