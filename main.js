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

server.use(cors());

server.get("/api/", (req, res) => {
  console.log(JSON.stringify(req.query));
  res.send(JSON.stringify(req.query));
});

server.use("/src", express.static("./public"));
