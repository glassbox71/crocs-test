import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAuthStore } from '../store/loginStore';

const GnbRight = ({ onSearchClick }) => {
    const navigate = useNavigate();
    const { user, handleUserClick, logout } = loginAuthStore();

    return (
        <ul className="gnb_right">
            <li>
                <button className="search_btn" onClick={onSearchClick}>
                    <img src="/images/search_icon.svg" alt="search_icon" />
                </button>
            </li>
            <li className="user_login_out_wrap">
                <button className="user_btn" onClick={() => handleUserClick(navigate)}>
                    <img src="/images/user_icon.svg" alt="user_icon" />
                </button>
                {/* 로그인 상태이면 로그아웃 버튼 표시 */}
                {user && (
                    <button className="logout_btn" onClick={() => logout(navigate)}>
                        <img src="/images/logout_icon.svg" alt="logout_icon" />
                    </button>
                )}
            </li>
            <li>
                <Link to="/cart" className="cart_btn">
                    <img src="/images/cart_icon.svg" alt="cart_icon" />
                </Link>
            </li>
        </ul>
    );
};

export default GnbRight;
