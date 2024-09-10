import * as http from "http";

// リスト2-5(start)
// リスト2-5(end)
import * as fs from "fs";

// リスト2-1 (start)
// const server = http.createServer((request, response) => {
//   response.end("Hello Node.js");
// });
// リスト2-1 (end)

// リスト2-2(start)
// const server = http.createServer((request, response) => {
//   response.end(
//     "<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>"
//   );
// });
// リスト2-2(end)

// リスト2-3(start)
// const server = http.createServer((request, response) => {
//   response.setHeader("Content-Type", "text/html");
//   response.write('<!DOCTYPE html><html lang="ja">');
//   response.write('<head><meta charset="utf-8">');
//   response.write("<title>Hello</title></head>");
//   response.write("<body><h1>Hello Node.js!</h1>");
//   response.write("<p>This is Node.js sample.page</p>");
//   response.write("<p>これは、Node.jsのサンプルページです。</p>", "utf8");
//   response.write("</body></html>");
//   response.end();
// });
// リスト2-3(end)

// リスト2-5(start)
const server = http.createServer((request, response) => {
  fs.readFile("./index.html", "UTF-8", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
});
// リスト2-5(end)
server.listen(3000);
console.log("Server start!");
