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

// 允许跨域
server.use(cors());

function join(json) {
  let str = `${json.appid}${json.q}${json.salt}bR4o8cuH6rqJPyclgxDU`;
  let sign = hex_md5(str);
  return `?q=${json.q}&from=${json.from}&to=${json.to}&appid=${json.appid}&salt=${json.salt}&sign=${sign}`;
}
server.get("/api", (req, res) => {
  const { q, from, to } = req.query;
  // let data = join({
  //   type: "GET",
  //   q,
  //   from,
  //   to,
  //   appid: "20190818000327471",
  //   salt: Math.floor(Math.random() * 100)
  // });
  const appid = "20190818000327471";
  const salt = Math.floor(Math.random() * 100);
  const sign = hex_md5(`${appid}${q}${salt}bR4o8cuH6rqJPyclgxDU`);
  const uri = `?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
  // fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate${data}`)
  fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate${uri}`)
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

// POST 请求体解析
// contentType: www-form-urlencoded
server.post("/save", express.urlencoded({ extended: true }));
// contentType: application/json
server.post("/save", express.json());
server.post("/save", (req, res) => {
  console.log(JSON.stringify(req.body));
  fs.writeFile("./data.json", JSON.stringify(req.body), err => {
    if (err) throw err;
    res.send("write OK");
  });
});
// 静态文件托管
server.use("/static", express.static("./public"));
