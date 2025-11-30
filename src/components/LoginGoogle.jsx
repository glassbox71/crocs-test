import React from 'react';
import { loginAuthStore } from '../store/loginStore';

const LoginGoogle = () => {
    const { onGoogleLogin } = loginAuthStore();

    return (
        <div className="google_wrap">
            <button className="sns_login google" onClick={onGoogleLogin} type="button">
                <img src="/images/google_icon.svg" alt="google_login" />
            </button>
        </div>
    );
};

export default LoginGoogle;
