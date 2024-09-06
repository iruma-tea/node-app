import http from "http"

// リスト2-1 (start)
let server = http.createServer(
    (request, response) => {
        response.end('Hello Node.js');
    }
);
server.listen(3000);
// リスト2-1 (end)
