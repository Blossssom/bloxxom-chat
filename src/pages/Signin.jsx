import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { signinRoute } from '../utils/ApiRouter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
    
`;

export default function Signin() {
    // const reduxState = useSelector(state => state.userInfo);
    const navigate = useNavigate();
    
    useEffect(() => {
        // const {_id} = reduxState;
        // if(_id !== '') {
        //     console.log('check!');
        //     navigate('/');
        // }
    }, []);

    const [inputValues, setInputValues] = useState({
        username: '',
        nickname: '',
        password: ''
    });

    const toastOption = {
        position: 'bottom-right',
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
    };

    const handleValidationForm = () => {
        const {username, nickname, password} = inputValues;
        console.log(username, nickname, password);

        if(username.length < 4 || username.length > 12) {
            toast.error('ID는 4 - 12 글자로 만들어주세요!!', toastOption);
            return false;
        }else if(nickname === '' || nickname.length > 15) {
            toast.error('Nickname은 0 - 15 글자로 만들어주세요!!', toastOption);
            return false;
        }else if(password.length < 6) {
            toast.error('Password는 6 글자 이상으로 만들어주세요!!', toastOption);
            return false;
        }
        return true;
    };

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };

    const handleSubmitAction = async (e) => {
        e.preventDefault();
        if(handleValidationForm()) {
            const {username, nickname, password} = inputValues;
            const {data} = await axios.post(signinRoute, {
                username,
                nickname,
                password
            });
            
            if(data.status === false) {
                toast.error(data.msg, toastOption);
            }

            if(data.status) {
                navigate('/login');
            }
        }
    };

    return (
        <Container>
            <h2>Sign in page</h2>
            <form onSubmit={(e) => handleSubmitAction(e)}>
                <input name='username' onChange={handleInputChange} type="text" placeholder='input id' />
                <input name='nickname' onChange={handleInputChange} type="text" placeholder='input nickname' />
                <input name='password' onChange={handleInputChange} type="password" placeholder='input password' />
                <button type='submit'>Sign in</button>
            </form>
            <ToastContainer />
        </Container>
    )
}
