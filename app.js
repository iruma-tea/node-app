import http from "http";
import fs from "fs";
import ejs from "ejs";
import url from "url";

const index_page = fs.readFileSync("./index.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

const server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    let url_parts = url.parse(request.url);
    switch(url_parts.pathname) {
        case "/":
            let content = ejs.render(index_page, {
                title: "Indexページ",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        case "/style.css":
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("no page...");
            break;
    }
}

// createServerの処理
// function getFromClient(req, res) {
//     let request = req;
//     let response = res;
//     fs.readFile('./index.html', 'UTF-8', (error, data) => {
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write(data);
//         response.end();
//     });
// }

// const server = http.createServer(
    // リスト2-1
    // (request, response) => {
    //     response.end("Hello, Node.js!");
    // }
    // リスト2-2
    // (request, response) => {
    //     response.end("<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>");
    // }
    // リスト2-3
    // (request, response) => {
    //     response.setHeader('Content-Type', 'text/html');
    //     response.write('<!DOCTYPE html><html lang="ja">');
    //     response.write('<head><meta charset="utf-8">');
    //     response.write('<title>Hello</title></head>');
    //     response.write('<body><h1>Hello Node.js!</h1>');
    //     response.write('<p>This is Node.js sample page.</p>');
    //     response.write('<p>これは、Node.jsのサンプルページです。</p>', 'utf8');
    //     response.write('</body></html>');
    //     response.end();
    // }
    // リスト2-4, 2-5
//     (request, response) => {
//         fs.readFile('./index.html', "UTF-8", (error, data) => {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data);
//             response.end();
//         });
//     }
// );

