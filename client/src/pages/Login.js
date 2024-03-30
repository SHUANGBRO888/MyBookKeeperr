import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import '../resources/authentication.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // Finish sign up to get Form
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', values);
            // Local storage
            localStorage.setItem(
                'expense-tracker-user',
                JSON.stringify({
                    ...response.data,
                    password: '',
                })
            );
            setLoading(false);
            message.success('Log in successfully!');
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Fail to Log in!');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('expense-tracker-user')) {
            navigate('/');
        }
    }, []);


    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className='row justify-content-center align-items-center w-100 h-100'>
                {/*Left */}
                <div className='col-md-4' data-aos='fade-right'>
                    {/*Form Pics */}
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>User Login</h1>
                        <br />
                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input type='password' autoComplete='off' />
                        </Form.Item>

                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register'> Click to enter Register Page</Link>
                            <button className='secondary' type='submit'>
                                Login
                            </button>
                        </div>
                    </Form>
                </div>
                {/*Right */}
                <div className='col-md-5' data-aos='fade-left'>
                    {/*Right Pics */}
                    <div className='lottie'>
                        <dotlottie-player
                            src="https://lottie.host/96002e9e-e526-478f-a749-75db09b7a8ca/pqXiPEArJ2.json"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;