const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const port = 3012;

app.get('/', (req, res) => res.send('connect httpServer').status(200));

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, {
    cors : {
        origin :"*",
        credentials :true
    }
});

const getPublicRoom = () => {
    const {sids, rooms} = socketServer.sockets.adapter;
    const publicRooms = [];
    console.log(rooms);
    rooms.forEach((v, key) => {
        if(sids.get(key) === undefined) {
            publicRooms.push({id: [...v][0], name: key});
        }
    });
    return publicRooms;
};

socketServer.on('connection', (socket) => {
    socket.onAny((e) => {
        console.log(socketServer.sockets.adapter);
    });

    socket.on('message', (msg, done) => {
        console.log(msg);
        done();
    });

    socket.on('join_room', (roomName, done) => {
        socket.join(roomName);
        done(roomName);
        socketServer.sockets.emit('roomLists', getPublicRoom());
    });

    socket.on('disconnecting', () => {
        console.log('disconnecting!!!');
    });

    socket.on('set_nickname', nickname => {
        socket['nickname'] = nickname;
    });

    socket.on('new_message', (msg, room, done) => {
        socket.to(room).emit('send_message', msg);
        done();
    });
});

httpServer.listen(port, () => {
    console.log('server on!!!');
});


