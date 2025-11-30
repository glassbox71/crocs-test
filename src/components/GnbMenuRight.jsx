import React from 'react';
import { Link } from 'react-router-dom';

const GnbMenuRight = () => {
    return (
        <ul className="gnb_right">
            <li>
                <Link to="/search">
                    <img src="/images/search_icon.svg" alt="search_icon" />
                </Link>
            </li>
            <li>
                <Link to="/login">
                    <img src="/images/user_icon.svg" alt="user_icon" />
                </Link>
            </li>
            <li>
                <Link to="/cart">
                    <img src="/images/cart_icon.svg" alt="cart_icon" />
                </Link>
            </li>
        </ul>
    );
};

export default GnbMenuRight;
