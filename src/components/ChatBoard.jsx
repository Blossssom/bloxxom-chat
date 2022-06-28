import { useEffect, useState } from 'react';
import './ChatBoard.css';

const ChatBoard = ({socket, roomName}) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        console.log(chat);
        socket.on('send_message', (msg) => setChat([...chat, msg]));
    }, [chat])

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        socket.emit('new_message', message, roomName, () => {
            setChat([...chat, message]);
        });
    };
    
    return (
        <>
            <section className="chat-board">
                <div className='chat-board__message-aria'>
                    <h2>{roomName}</h2>
                    <ul className="chat-ul">
                        {
                            chat.length !== 0
                                ? chat.map(chatting => {
                                    return <li key={chat.indexOf(chatting)}>{chatting}</li>
                                })
                                : null
                        }
                    </ul>
                </div>
                
                <div>
                    <input onChange={handleMessageChange} type="text" placeholder="input message..." value={message} />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </section>
        </>
    )
};

export default ChatBoard;