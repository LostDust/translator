const express = require("express");
const fs = require("fs");

const server = express();

server.listen(5050, () => {
  console.log("Server Start!");
});

server.get("/", (req, res) => {
  console.log(`有人来了："${req.url}"`);
  fs.readFile("./src/index.html", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

server.use("/src", express.static("./public"));
