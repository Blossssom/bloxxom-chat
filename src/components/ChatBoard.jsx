import { useEffect, useState } from 'react';
import './ChatBoard.css';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chatroom from './Chatroom';
import styled from 'styled-components';

const Container = styled.article`
    box-sizing: border-box;
    width: 70%;
    background-color: #f4f6ff;
    display: flex;
    justify-content: center;
    align-items: center;

    section {
        width: 80%;
        height: 100vh;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .chat-board__users {
            padding: 10px 0;
            font-size: 1.1rem;
        }

        .chat-board__room {
            width: 100%;
            height: 90%;
            /* margin-bottom: 20px; */
        }
    }

    

    
`;

const ChatBoard = ({currentUser, sendChat, chatLog, chatUser, room}) => {
    
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
            <section>
                {
                    room ?
                    <>
                        {
                            chatUser && 
                            <div className='chat-board__users'>
                                {`${currentUser.nickname}, ${chatUser.nickname}`}
                            </div>
                        }
                        
                        <div className='chat-board__room'>
                            <Chatroom currentUser={currentUser} chatLog={chatLog} />
                        </div>
                        
                        <ChatInput sendChat={sendChat} />
                    </> :
                    <div>
                        welcome!!!
                    </div>
                    
                }
                
            </section>
        </Container>
    )
};

export default ChatBoard;