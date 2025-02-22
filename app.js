import {createServer} from 'http'
import {readFile} from 'fs'

// リスト２－１
// let server = createServer((request, response) => {
//     response.end('Hello, Node.js!');
// });

// リスト２－２
// let server = createServer((request, response) => {
//     response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>')
// });

// リスト２－３
// let server = createServer((requeset, response) => {
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
// let server = createServer((request, response) => {
//     readFile('./index.html', 'utf-8', (error, data) => {
//         response.writeHead(200, {'Content-type': "text/html"});
//         response.write(data);
//         response.end();
//     });
// });

// リスト２－６
let server = createServer(getFromclient)

server.listen(3000);
console.log('Server start!');

// リスト２－６
// createServerの処理
function getFromclient(req, res) {
    let request = req;
    let response = res;
    readFile('./index.html', 'utf-8', (error, data) => {
        response.writeHead(200, {"Content-type":"text/html"});
        response.write(data);
        response.end();
    });
}