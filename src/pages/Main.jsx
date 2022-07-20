import ChatBoard from "../components/ChatBoard";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUserRoute, addChatLog, getChatLog } from "../utils/ApiRouter";
import styled from 'styled-components';


// roomlist로 기존방에 emit 호출 막기
// 로그아웃
// disconnect 정리

const Container = styled.main`
    height: 100vh;
    display: flex;
`;

const socket = io.connect('http://localhost:3012/');
const Main = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [chatUser, setChatUser] = useState(undefined);
    const [allUsers, setAllUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [room, setRoom] = useState('');
    const [receive, setReceive] = useState();

    const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(chatLog);
        socket.on('receive_message', (data) => setReceive(data));
        console.log('end receive');
    }, []);

    useEffect(() => {
        receive && setChatLog((prev) => [...prev, receive]);
    }, [receive]);
    
    useEffect(() => {
        const {_id} = reduxState;
        if(_id === '') {
            navigate('/login');
        }else {
            setIsLogin(true);
            socket.on('receive_message', (data) => setReceive(data));
            setCurrentUser(reduxState);
        }
        return () => {
            socket.disconnect();
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
        <Container>
            {
                isLogin &&
                <>
                    <SideBar setRoom={setRoom} currentUser={currentUser} allUsers={allUsers} socket={socket} contacts={handleChatUser} />
                    <ChatBoard room={room} chatUser={chatUser} chatLog={chatLog} sendChat={handleSendChat} currentUser={currentUser} socket={socket} />
                </>
            }
        </Container>
    );
};

export default Main;