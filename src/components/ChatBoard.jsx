import { useEffect, useState } from 'react';
import './ChatBoard.css';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chatroom from './Chatroom';

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
        <>
            <section className="chat-board">
                {currentUser.username}
                <div className='chat-board__message-aria'>
                    <h2>{roomName}</h2>
                    <Chatroom socket={socket} chatLog={chatLog} chat={chat} />
                </div>
                
                <ChatInput sendChat={sendChat} />
            </section>
        </>
    )
};

export default ChatBoard;