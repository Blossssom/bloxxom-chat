import { useEffect, useState } from 'react';
import './ChatBoard.css';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chatroom from './Chatroom';
import styled from 'styled-components';

const Container = styled.article`
    width: 70%;
    background-color: #f4f6ff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
        /* height: 90%; */
    }
`;

const ChatBoard = ({socket, roomName, currentUser, sendChat, chatLog, chat}) => {
    
    const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();
    
    useEffect(() => {
        const {_id} = reduxState;
        if(_id === '') {
            navigate('/login');
        }
    }, []);

    
    return (
        <Container>
            {currentUser.username}
            <div>
                <h2>{roomName}</h2>
                <Chatroom socket={socket} chatLog={chatLog} chat={chat} />
            </div>
            
            <ChatInput sendChat={sendChat} />
        </Container>
    )
};

export default ChatBoard;