import ChatBoard from "../components/ChatBoard";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import './Main.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUserRoute, addChatLog, getChatLog } from "../utils/ApiRouter";

const socket = io.connect('http://localhost:3012/');
const Main = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [chatUser, setChatUser] = useState(undefined);
    const [allUsers, setAllUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [room, setRoom] = useState('');
    const [chat, setChat] = useState({});
    const [receive, setReceive] = useState([]);

    const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(chatLog);
        socket.on('receive_message', (data) => setChatLog([...chatLog, data]));
    }, [chatLog]);

    
    useEffect(() => {
        const {_id} = reduxState;
        if(_id === '') {
            navigate('/login');
        }else {
            setIsLogin(true);
            setCurrentUser(reduxState);
        }

        return () => {
            socket.emit('disconnection');
        };
    }, []);


    useEffect(() => {
        const getAllUsers = async () => {
            if(currentUser) {
                const {data} = await axios.get(`${allUserRoute}/${currentUser._id}`);
                console.log(data);
                setAllUsers(data);
            }else {
                return false;
            }
        };
        getAllUsers();
    }, [currentUser]);


    useEffect(() => {
        const getChatLogs = async () => {
            const messages = await axios.post(getChatLog, {
                from: currentUser._id,
                to: chatUser._id
            });
            setChatLog(messages.data);
        };
        if(chatUser !== undefined) {
            getChatLogs();
        }
    }, [chatUser]);


    const handleChatUser = (chatUser) => {
        setChatUser(chatUser);
    };

    const handleSendChat = async (msg) => {
        await axios.post(addChatLog, {
            message: msg,
            from: currentUser._id,
            to: chatUser._id
        });

        socket.emit('send_message', {
            message: msg,
            roomname: room,
            from: currentUser._id,
            to: chatUser._id
        }, () => {setChatLog([...chatLog, {sender: currentUser._id, sendMessage: msg}])});
    };

    return (
        <main>
            {
                isLogin &&
                <>
                    {chatUser && chatUser.username}
                    <SideBar setRoom={setRoom} currentUser={currentUser} allUsers={allUsers} socket={socket} contacts={handleChatUser} />
                    <ChatBoard chat={chat} chatLog={chatLog} sendChat={handleSendChat} currentUser={currentUser} socket={socket} />
                </>
            }
        </main>
    );
};

export default Main;