const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const serverRouter = require('./router/serverRouter');
const app = express();
require('dotenv').config({path: "./server/.env"});

app.use(cors());
app.use(express.json());
app.use('/api/auth', serverRouter);
app.get('/', (req, res) => res.send('connect httpServer').status(200));

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, {
    cors : {
        origin :"*",
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

const getPublicRoom = () => {
    const {sids, rooms} = socketServer.sockets.adapter;
    const publicRooms = [];
    rooms.forEach((v, key) => {
        if(sids.get(key) === undefined) {
            publicRooms.push({id: [...v][0], name: key});
        }
    });
    return publicRooms;
};

socketServer.on('connection', (socket) => {
    socket.onAny((e) => {
        console.log(`Socket Event : ${e}`);
    });

    // socket.on('send_message')

    // socket.on('message', (msg, done) => {
    //     console.log(msg);
    //     done();
    // });

    socket.on('join_room', (roomName) => {
        socket.join(roomName);
    });

    socket.on('disconnecting', () => {
        console.log('disconnecting!!!');
    });

    socket.on('send_message', (data, done) => {
        socket.to(data.room).emit('receive_message', {
            sender: data.from,
            sendMessage: data.message,
        });
        done();
    });
});

httpServer.listen(process.env.PORT, () => {
    console.log(`server on!!! on ${process.env.PORT}`);
});


