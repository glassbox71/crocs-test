import React from 'react';
import Title from '../components/Title';
import LoginSns from '../components/LoginSns';
import JoinForm from '../components/JoinForm';
import './scss/join.scss';

const Join = () => {
    return (
        <div className="sub_page">
            <div className="inner">
                <div className="join_wrap">
                    <Title title="Join" />
                    <LoginSns />
                    <JoinForm />
                </div>
            </div>
        </div>
    );
};

export default Join;