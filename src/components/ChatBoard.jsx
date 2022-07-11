import { useEffect, useState } from 'react';
import './ChatBoard.css';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatBoard = ({socket, roomName, currentUser, sendChat}) => {
    const [message, setMessage] = useState('');
    const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();
    
    useEffect(() => {
        const {_id} = reduxState;
        if(_id === '') {
            navigate('/login');
        }
    }, []);

    // useEffect(() => {
    //     console.log(chat);
    //     socket.on('send_message', (msg) => setChat([...chat, msg]));
    //     console.log(chat);
    // }, [chat])

    // const handleSendMessage = () => {
    //     if(message) {
    //         socket.emit('new_message', message, roomName, () => {
    //             setChat([...chat, `You : ${message}`]);
    //         });
    //     }
    // };

    
    return (
        <>
            <section className="chat-board">
                {currentUser.username}
                <div className='chat-board__message-aria'>
                    <h2>{roomName}</h2>
                </div>
                
                <ChatInput sendChat={sendChat} />
            </section>
        </>
    )
};

export default ChatBoard;