const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const serverRouter = require('./router/serverRouter');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config({path: "D:/frontend-projects/bloxxom-chat/server/.env"});

app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials :true
}));
app.use(express.json());
app.use('/api/auth', serverRouter);
app.get('/', (req, res) => res.send('connect httpServer').status(200));

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, {
    cors : {
        origin: '*',
        credentials :true
    }
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connect!!!');
}).catch((err) => {
    console.log(err.message);
});
// DB 연결 문자열 파싱허용, 통합 토폴로지 사용


socketServer.on('connection', (socket) => {
    socket.onAny((e) => {
        console.log(`Socket Event : ${e}`);
    });

    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        console.log(socketServer.sockets.adapter.rooms);
    });

    socket.on('disconnecting', () => {
        console.log('disconnecting!!!');
    });

    socket.on('send_message', (data, done) => {
        console.log(data.roomname);
        console.log(socketServer.sockets.adapter.rooms);
        socket.broadcast.to(data.roomname).emit('receive_message', {
            sender: data.from,
            sendMessage: data.message,
        });
        done();
    });
});
console.log(process.env.PORT)

httpServer.listen(process.env.PORT, () => {
    console.log(`server on!!! on ${process.env.PORT}`);
});


