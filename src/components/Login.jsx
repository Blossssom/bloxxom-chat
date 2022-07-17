import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/ApiRouter";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { loginInfo } from '../actions/actions'

const Container = styled.article`
    display: flex;
    height: 100vh;
    width: 100vw;

    .login-formaria {
        width: 50%;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        section {
            width: 70%;

            div {
                display: flex;
                justify-content: center;
            }

            p {
                margin-bottom: 30px;
            }

            form {
                display: flex;
                flex-direction: column;

                input {
                    border: none;
                    background-color: #f9f8fd;
                    border-radius: 30px;
                    padding: 16px 24px;
                    font-size: 0.9rem;
                    outline: none;
                    margin-bottom: 24px;

                    &::placeholder {
                        color: #cdcdcd;
                        font-weight: bold;
                    }

                    &:last-of-type {
                        margin-bottom: 80px;
                    }
                }

                label {
                    margin-bottom: 16px;
                }

                button {
                    border: none;
                    background-color: #c22180;
                    color: white;
                    font-size: 1.1rem;
                    width: 200px;
                    height: 50px;
                    border-radius: 60px;
                }
            }   
        }
    }

    .login-sideground {
        width: 50%;
        flex-grow: 1;
        background-image: url('https://i.pinimg.com/564x/97/81/df/9781dfe541804b99ede55eaa36be0060.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }
`;

const Login = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        check: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxState = useSelector(state => state.userInfo);
    
    useEffect(() => {
        // const {_id} = reduxState;
        // if(_id !== '') {
        //     console.log('check!')
        //     navigate('/');
        // }
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
        if(e.target.name === 'check') {
            setInputValues({...inputValues, 'check': !inputValues.check});
        }else {
            setInputValues({...inputValues, [e.target.name]: e.target.value});
        }
    };

    const handleSubmitAction = async (e) => {
        e.preventDefault();
        if(handleValidationForm) {
            const {username, password, check} = inputValues;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
                check
            });

            if(data.status === false) {
                toast.error(data.msg, toastOption);
            }

            // if(data.status) {
            //     dispatch(loginInfo(data.userInfo));
            //     navigate('/');
            // }
        }
    };

    return (
        <Container>
            <div className="login-sideground">
            </div>
            <div className="login-formaria">
                <section>
                    <h2>Login Page</h2>
                    <p>Log in if you have an account in here</p>
                    <form onSubmit={(e) => handleSubmitAction(e)}>
                        <label htmlFor="login-id">Your id</label>
                        <input id="login-id" placeholder="Enter your email" onChange={(e) => handleInputChange(e)} type="text" name="username" />
                        <label htmlFor="login-pw">Password</label>
                        <input id="login-pw" placeholder="Enter your password" onChange={(e) => handleInputChange(e)} type="password" name="password" />
                        <label htmlFor="login-check">keep login?</label>
                        <input id="login-check" type="checkbox" onChange={(e) => handleInputChange(e)} name="check" />
                        <div>
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                </section>
            </div>
            
            <ToastContainer />
        </Container>
    );
}

export default Login;