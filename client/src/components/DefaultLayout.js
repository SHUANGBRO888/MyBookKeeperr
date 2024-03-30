import React from 'react';
import '../resources/default-layout.css'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';

const DefaultLayout = (props) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('expense-tracker-user'));
    const items = [
        {
            key: '1',
            label: (
                <a
                    onClick={() => {
                        localStorage.removeItem('expense-tracker-user');
                        navigate('/login');
                    }}>
                    Exit
                </a>
            )
        }
    ]

    return (
        <div className='layout'>
            {/* Header */}
            <div className='header d-flex justify-content-between align-items-center'>
                <div>
                    <h1 className='logo'>My bookkeeper</h1>
                </div>
                <div>
                    <Dropdown menu={{ items }} placement='bottom'>
                        <h1 className='username'>{user.name}</h1>
                    </Dropdown>
                </div>
            </div>
            {/* Content */}
            <div className='content'>{props.children}</div>
        </div>
    );
};

export default DefaultLayout;