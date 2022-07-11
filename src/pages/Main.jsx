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
    const [thisRoom, setThisRoom] = useState('');
    const [currentUser, setCurrentUser] = useState(undefined);
    const [chatUser, setChatUser] = useState(undefined);
    const [allUsers, setAllUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();
    
    useEffect(() => {
        // console.log('hi');
        // socket.emit('message', 'hello server', () => {
        //     console.log('server is done!!!');
        // });
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
            setChatLog(messages);
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
            from: currentUser,
            to: chatUser
        });
    };

    return (
        <main>
            {
                isLogin && 
                <>
                    {chatUser && chatUser.username}
                    <SideBar allUsers={allUsers} socket={socket} setRoom={setThisRoom} contacts={handleChatUser} />
                    <ChatBoard sendChat={handleSendChat} currentUser={currentUser} socket={socket} roomName={thisRoom} />
                </>
            }
        </main>
    );
};

export default Main;