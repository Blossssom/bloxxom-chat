import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/ApiRouter";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { loginInfo } from '../actions/actions'

const Container = styled.div`
    
`;

const Login = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxState = useSelector(state => state.userInfo);
    
    useEffect(() => {
        const {_id} = reduxState;
        if(_id !== '') {
            console.log('check!')
            navigate('/');
        }
    }, []);

    const toastOption = {
        position: 'bottom-right',
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    const handleValidationForm = () => {
        const {username, password} = inputValues;

        if(username < 4 || username > 12) {
            toast.error('ID는 4 - 12 글자입니다!!!', toastOption);
            return false;
        }else if(password < 6) {
            toast.error('Password는 6 글자 이상입니다!!!', toastOption);
            return false;
        }
        return true;
    };

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };

    const handleSubmitAction = async (e) => {
        e.preventDefault();
        if(handleValidationForm) {
            const {username, password} = inputValues;
            const {data} = await axios.post(loginRoute, {
                username,
                password
            });

            if(data.status === false) {
                toast.error(data.msg, toastOption);
            }

            if(data.status) {
                // console.log(data.userInfo);
                dispatch(loginInfo(data.userInfo));
                navigate('/');
            }
        }
    };

    return (
        <Container>
            <h2>Login Page</h2>
            <form onSubmit={(e) => handleSubmitAction(e)}>
                <input onChange={(e) => handleInputChange(e)} type="text" name="username" />
                <input onChange={(e) => handleInputChange(e)} type="password" name="password" />
                <button type="submit">Log in</button>
            </form>
            <ToastContainer />
        </Container>
    );
}

export default Login;