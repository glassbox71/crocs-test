import React from 'react';
import LoginKakao from './LoginKakao';
import LoginGoogle from './LoginGoogle';
import './scss/loginsns.scss';
import LoginNaver from './LoginNaver';

const LoginSns = () => {
    return (
        <div className="login_sns_wrap">
            <LoginKakao />
            <LoginGoogle />
            <LoginNaver />
        </div>
    );
};

export default LoginSns;
