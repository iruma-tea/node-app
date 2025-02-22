import * as http from 'http';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as url from 'url';

// リスト２－１
// let server = http.createServer((request, response) => {
//     response.end('Hello, Node.js!');
// });

// リスト２－２
// let server = http.createServer((request, response) => {
//     response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>')
// });

// リスト２－３
// let server = http.createServer((requeset, response) => {
//     response.setHeader('Content-type', 'text/html');
//     response.write('<!DOCTYPE html><html lang="ja">');
//     response.write('<head><meta charset="utf-8">');
//     response.write('<title>Hello Node.js!</title></head>');
//     response.write('<body><h1>Hello Node.js!</h1>');
//     response.write('<p>This is Node.js sample page.</p>');
//     response.write('<p>これは、Node.jsのサンプルページです。</p>', "utf-8");
//     response.write('</body></html>');
//     response.end();
// });

// リスト２－５
// let server = http.createServer((request, response) => {
//     fs.readFile('./index.html', 'utf-8', (error, data) => {
//         response.writeHead(200, {'Content-type': "text/html"});
//         response.write(data);
//         response.end();
//     });
// });

// リスト２－８
const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8'); // リスト２ー１６
const style_css = fs.readFileSync('./style.css', 'utf-8');

// リスト２－６
let server = http.createServer(getFromClient)

server.listen(3000);
console.log('Server start!');

// リスト２－６
// createServerの処理
// function getFromClient(req, res) {
//     let request = req;
//     let response = res;
//     fs.readFile('./index.html', 'utf-8', (error, data) => {
//         response.writeHead(200, {"Content-type":"text/html"});
//         response.write(data);
//         response.end();
//     });
// }

// リスト２－８
// function getFromClient(request, response) {
//     let content = ejs.render(index_page);
//     response.writeHead(200, {"Content-type": "text/html"});
//     response.write(content);
//     response.end();
// }

// リスト２－１０
// function getFromClient(request, response) {
//     let content = ejs.render(index_page, {
//         title: "Indexページ",
//         content: "これはテンプレートを使ったサンプルページです。",
//     });
//     response.writeHead(200, {"Content-type": "text/html"});
//     response.write(content);
//     response.end();
// }

// リスト２ー１３
function getFromClient(request, response) {
    let url_parts = url.parse(request.url);
    switch (url_parts.pathname) {
        case '/':
            var content = ejs.render(index_page, {
                title: "Index",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, {"Content-type": "text/html"});
            response.write(content);
            response.end();
            break;
        case '/other':
            var content = ejs.render(other_page, {
                title: "Other",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, {'Content-type': "text/html"});
            response.write(content);
            response.end();
            break;
        case '/style.css':
            response.writeHead(200, {"Content-type": "text/css"});
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, {"Content-type":"text/plain"});
            response.end('no page...');
            break;
    }
}