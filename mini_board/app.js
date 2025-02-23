import * as http from 'http';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as url from 'url';
import * as qs from 'querystring';

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const login_page = fs.readFileSync('./login.ejs', 'utf-8');
const max_num = 10;
const filename = 'mydata.txt';
let message_data;
readFromFile(filename);

let server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch(url_parts.pathname) {
        case '/': // トップページ
            response_index(request, response);
            break;
        case '/login': //   ログインページ
            response_login(request, response);
            break;
        default:
            response.writeHead(200, {"Content-Type":"text/html"});
            response.end('no page...');
            break;
    }
}

// loginアクセス処理
function response_login(request, response) {
    let content = ejs.render(login_page, {});
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

// indexのアクセス処理
function response_index(request, response) {
    // POSTアクセス時
    if (request.method == 'POST') {
        let body = '';

        // データ受信イベント
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了後のイベント処理
        request.on('end', () => {
            let data = qs.parse(body);
            addToData(data.id, data.msg, filename, request);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

function write_index(request, response) {
    let msg = "※何かメッセージを書いてください。";
    let content = ejs.render(index_page, {
        title: 'Index',
        content: msg,
        data: message_data,
        filename: 'data_item',
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

// テキストファイルのロード
function readFromFile(fname) {
    fs.readFile(fname, 'utf-8', (err, data) => {
        message_data = data.split('\n');
    });
}

// データの更新
function addToData(id, msg, fname, request) {
    let obj = {'id': id, 'msg': msg};
    let obj_str = JSON.stringify(obj);
    console.log('add data: ' + obj_str);
    message_data.unshift(obj_str);
    if (message_data.length > max_num) {
        message_data.pop();
    }
    saveToFile(fname)
}

// データの保存
function saveToFile(fname) {
    let data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) => {
        if (err) { throw err; }
    });
}