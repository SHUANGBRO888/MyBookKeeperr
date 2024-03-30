import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import Spinner from '../components/Spinner';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Finish sign up to get Form
    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.post('/api/users/register', values);
            message.success('Sign Up successfully');
            setLoading(false);
        } catch (error) {
            message.error('Sorry, there is a error in Sign Up')
            setLoading(false);
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
            <div className='row justify-content align-items-center w-100 h-100'>
                {/*Left */}
                <div className='col-md-5' data-aos='fade-right'>
                    {/*Left Pics */}
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
                {/*Right */}
                <div className='col-md-4' data-aos='fade-left'>
                    {/*Form Pics */}
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>Sign up</h1>
                        <br />
                        <Form.Item label='Name' name='name'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input type='password' />
                        </Form.Item>

                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/login'> If you finished Sign up, click to enter Login Page</Link>
                            <button className='secondary' type='submit'>
                                Sign Up
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div >
    );
};

export default Register;