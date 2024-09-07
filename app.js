import http from "http";

// リスト2-1 (start)
// let server = http.createServer((request, response) => {
//   response.end("Hello Node.js");
// });
// リスト2-1 (end)

// リスト2-2(start)
let server = http.createServer((request, response) => {
  response.end(
    "<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>"
  );
});
// リスト2-2(end)
server.listen(3000);
