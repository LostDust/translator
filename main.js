const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.listen(3100, () => {
  console.log("Server Start!");
});

server.get("/", (req, res) => {
  console.log(`有人来了："${req.url}"`);
  fs.readFile("./src/index.html", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.use(cors());

server.get("/api/", (req, res) => {
  console.log(`${req.query}`);
  res.send("Hello");
});

server.use("/src", express.static("./public"));
