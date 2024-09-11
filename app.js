import * as http from "http";

// リスト2-5(start)
import * as fs from "fs";
// リスト2-5(end)
// リスト2-8(start)
import * as ejs from "ejs";
// リスト2-8(end)
// リスト2-13(start)
import * as url from "url";
// リスト2-13(end)

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
// const server = http.createServer((request, response) => {
//   fs.readFile("./index.html", "UTF-8", (error, data) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(data);
//     response.end();
//   });
// });
// リスト2-5(end)

// リスト2-8(start)
const index_page = fs.readFileSync("./index.ejs", "utf-8");
// リスト2-8(end)
// リスト2-13(start)
const style_css = fs.readFileSync("./style.css", "utf-8");
// リスト2-13(end)

// リスト2-6(start)
const server = http.createServer(getFromClient);
// リスト2-6(end)

server.listen(3000);
console.log("Server start!");

// createServerの処理
// function getFromClient(req, res) {
//   let request = req;
//   let response = res;

//   fs.readFile("./index.html", "UTF-8", (error, data) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(data);
//     response.end();
//   });
// }

// リスト2-8(start)
function getFromClient(request, response) {
  // リスト2-13(start)
  const url_parts = url.parse(request.url);
  switch (url_parts.pathname) {
    case "/":
      const content = ejs.render(index_page, {
        // リスト2-9(start)
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです。",
        // リスト2-9(end)
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;
    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page...");
      break;
  }
  // リスト2-13(end)
}
// リスト2-8(end)
