import * as http from 'http';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as url from 'url';
import * as qs from 'querystring';

// リスト３－４
// let data = {
//     'Taro': '09-999-9999',
//     'Hanako': '080-888-888',
//     'Sachiko': '070-777-777',
//     'Ichiro': '060-666-666,'
// };

// リスト３－１１
let data2 = {
    'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
    'Hanako': ['hanako@flower', '080-888-888', 'Yokohama'],
    'Sachiko': ['sachi@happy', '070-777-777', 'Nagoya'],
    'Ichiro': ['ichi@baseball', '060-666-666', 'USA'],
};

// リスト３ー１４
let data = {msg: "no message."};

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
// function getFromClient(request, response) {
//     let url_parts = url.parse(request.url);
//     switch (url_parts.pathname) {
//         case '/':
//             var content = ejs.render(index_page, {
//                 title: "Index",
//                 content: "これはIndexページです。",
//             });
//             response.writeHead(200, {"Content-type": "text/html"});
//             response.write(content);
//             response.end();
//             break;
//         case '/other':
//             var content = ejs.render(other_page, {
//                 title: "Other",
//                 content: "これは新しく用意したページです。",
//             });
//             response.writeHead(200, {'Content-type': "text/html"});
//             response.write(content);
//             response.end();
//             break;
//         case '/style.css':
//             response.writeHead(200, {"Content-type": "text/css"});
//             response.write(style_css);
//             response.end();
//             break;
//         default:
//             response.writeHead(200, {"Content-type":"text/plain"});
//             response.end('no page...');
//             break;
//     }
// }

// リスト３－１
// function getFromClient(request, response) {
//     let url_parts = url.parse(request.url, true);
//     switch (url_parts.pathname) {
//         case '/':
//             var content = "これはIndexページです。";
//             var query = url_parts.query;
//             if (query.msg != undefined) {
//                 content += 'あなたは、「' + query.msg + '」と送りました。';
//             }
//             var content = ejs.render(index_page, {
//                 title: "Index",
//                 content: content,
//             });
//             response.writeHead(200, {"Content-type": "text/html"});
//             response.write(content);
//             response.end();
//             break;
//         case '/other':
//             var content = ejs.render(other_page, {
//                 title: "Other",
//                 content: "これは新しく用意したページです。",
//             });
//             response.writeHead(200, {'Content-type': "text/html"});
//             response.write(content);
//             response.end();
//             break;
//         case '/style.css':
//             response.writeHead(200, {"Content-type": "text/css"});
//             response.write(style_css);
//             response.end();
//             break;
//         default:
//             response.writeHead(200, {"Content-type":"text/plain"});
//             response.end('no page...');
//             break;
//     }
// }

// リスト３－３
function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        case '/other':
            response_other(request, response);
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

// indexのアクセス処理
// function response_index(request, response) {
//     let msg = "これはIndexページです。";
//     let content = ejs.render(index_page, {
//         title: "Index",
//         content: msg,
//         data: data, // リスト３－４
//         filename: 'data_item', // リスト３－８
//     });
//     response.writeHead(200, {'Content-type': 'text/html'});
//     response.write(content);
//     response.end();
// }

// リスト３ー１４
function response_index(request, response) {
    if (request.method == 'POST') {
        let body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント
        request.on('end', () => {
            data = qs.parse(body);
            // クッキーの保存)
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// リスト３ー１４
function write_index(request, response) {
    let msg = "※伝言を表示します。";
    let cookie_data = getCookie('msg', request);
    let content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    });
    response.writeHead(200, {"Content-type": "text/html"});
    response.write(content);
    response.end();
}

// リスト３－１６
// クッキーの値を設定
function setCookie(key, value, response) {
    let cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}
// クッキーの値を取得
function getCookie(key, request) {
    let cookie_data = request.headers.cookie != undefined ? request.headers.cookie : '';
    let data = cookie_data.split(';');
    for (let i in data) {
        if (data[i].trim().startsWith(key + '=')) {
            let result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return '';
}

// otherの処理
// function response_other(request, response) {
//     let msg = "これはOtherページです。";
//     // POSTアクセスの場合
//     if (request.method == 'POST') {
//         let body = '';

//         // データの受領のイベント処理
//         request.on('data', (data) => {
//             body += data;
//         });

//         // データ受信終了後のイベント処理
//         request.on('end', () => {
//             let post_data = qs.parse(body);
//             msg += 'あなたは、「' + post_data.msg + '」と書きました。';
//             let content = ejs.render(other_page, {
//                 title: "Other",
//                 content: msg,
//             });
//             response.writeHead(200, {"Content-type": "text/html"});
//             response.write(content);
//             response.end();
//         });

//     } else {
//         let msg = "ページがありません。";
//         let content = ejs.render(other_page, {
//             title: "Other",
//             content: msg,
//         });
//         response.writeHead(200, {"Content-type": "text/html"});
//         response.write(content);
//         response.end();
//     }
// }

// リスト３－１１
function response_other(request, response) {
    let msg = "これはOtherページです。";
    let content = ejs.render(other_page, {
        title: "Other",
        content: msg,
        data: data2, 
        filename: 'data_item',
    });
    response.writeHead(200, {"Content-type": "text/html"});
    response.write(content);
    response.end();
}