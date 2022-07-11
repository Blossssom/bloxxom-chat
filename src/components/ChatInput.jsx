import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`

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
