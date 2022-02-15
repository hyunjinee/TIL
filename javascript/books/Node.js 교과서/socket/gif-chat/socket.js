const SocketIo = require('socket.io')



module.exports = (server) => {
    const io = SocketIo(server, {path: '/socket.io'})

    io.on('connection', (socket)=> {
        const req = socket.request
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip)
        
    })
}