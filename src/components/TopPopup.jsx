import React from 'react';
import './scss/topPopup.scss';
import { Link } from 'react-router-dom';

const TopPopup = () => {
    return (
        <div className="top_popup_wrap">
            <button>
                <Link>{/* <img src="" alt="" /> */}</Link>
            </button>
            <Link to="/topPopup">
                지금 크록스 클럽 신청하고 추가 15% 할인 쿠폰 및 다양한 혜택을 무료로 받아보세요.
                <span>혜택받으러 가기</span>
            </Link>
            <button>
                <Link>{/* <img src="" alt="" /> */}</Link>
            </button>
        </div>
    );
};

export default TopPopup;
