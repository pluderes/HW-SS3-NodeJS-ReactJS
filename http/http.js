const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("hello baby");
});

server.listen(5000);
console.log("nodeJS web sever....");