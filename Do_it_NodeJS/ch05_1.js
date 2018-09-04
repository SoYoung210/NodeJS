const http = require('http')

const server = http.createServer()

const port = 3000

server.listen(port, ()=> {
    console.log(`web server start${port}`)
})
//클라이언트 연결 이벤트
server.on('connection', socket=> {
    let addr = socket.address()

    console.log(`클라 이벤트 접속${addr.address} ${addr.port}`)
})