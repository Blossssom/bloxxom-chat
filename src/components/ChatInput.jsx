import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.section`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    form {
        box-sizing: border-box;
        width: 60%;
        padding: 20px;
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
