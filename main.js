const express = require("express");
const fs = require("fs");
const cors = require("cors");
const fetch = require("node-fetch");
const { hex_md5 } = require("./lib/md5.js");

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

function join(json) {
  let str = `${json.appid}${json.q}${json.salt}bR4o8cuH6rqJPyclgxDU`;
  let sign = hex_md5(str);
  return `?q=${json.q}&from=${json.from}&to=${json.to}&appid=${json.appid}&salt=${json.salt}&sign=${sign}`;
}
server.get("/api", (req, res) => {
  const { q, from, to } = req.query;
  let data = join({
    type: "GET",
    q,
    from,
    to,
    appid: "20190818000327471",
    salt: Math.floor(Math.random() * 100)
  });
  fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate${data}`)
    .then(res => res.json())
    .then(msg => {
      console.log(msg.trans_result[0].dst);
      res.send(msg.trans_result[0].dst);
    });
});
server.get("/database", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

server.use("/src", express.static("./public"));
