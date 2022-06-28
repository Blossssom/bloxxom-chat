import ChatBoard from "../components/ChatBoard";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import './Main.css';

const socket = io.connect('http://localhost:3012/');
const Main = () => {
    const [thisRoom, setThisRoom] = useState('');
    
    useEffect(() => {
        console.log('hi');
        socket.emit('message', 'hello server', () => {
            console.log('server is done!!!');
        });
    }, []);

    return (
        <main>
            <SideBar socket={socket} setRoom={setThisRoom} />
            <ChatBoard socket={socket} roomName={thisRoom} />
        </main>
    );
};

export default Main;