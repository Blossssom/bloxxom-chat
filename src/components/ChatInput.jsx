import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;

    form {
        width: 100%;
        flex-grow: 1;
        padding: 8px 20px;
        background-color: coral;
        border-radius: 30px;
        display: flex;
        justify-content: space-between;
        
        input {
            border: none;
            background-color: transparent;
            width: 90%;
            outline: none;
            font-size: 1.1rem;
        }

        button {
            border: none;
            background-color: #c22180;
            height: 40px;
            width: 80px;
            font-size: 1rem;
            border-radius: 20px;
            cursor: pointer;
        }
    }
`;

export default function ChatInput({sendChat}) {
    const [message, setMessage] = useState('');

    const handleSendChat = (e) => {
        e.preventDefault();
        if(message.length > 0) {
            sendChat(message);
            setMessage('')
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <Container>
            <form onSubmit={(e) => handleSendChat(e)}>
                <input onChange={(e) => handleInputChange(e)} value={message} type="text" placeholder='input text' />
                <button type='onSubmit'>Send</button>
            </form>
        </Container>
    )
}
