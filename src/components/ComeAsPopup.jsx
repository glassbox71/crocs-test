import React from 'react';
import { Link } from 'react-router-dom';
import './scss/comeAsPopup.scss';

const ComeAsPopup = ({ onClose }) => {
    return (
        <div className="come_as_popup_wrap">
            <div className="come_as_wrap">
                <button className="close_btn" onClick={onClose}>
                    ✕
                </button>
                <p className="jibbitz jibbitz_img1">
                    <img src="/images/monthly_zibbitz_01.svg" alt="zibbitz_img1" />
                </p>
                <p className="jibbitz jibbitz_img2">
                    <img src="/images/monthly_zibbitz_02.svg" alt="zibbitz_img2" />
                </p>
                <p className="jibbitz jibbitz_img3">
                    <img src="/images/monthly_zibbitz_03.svg" alt="zibbitz_img3" />
                </p>
                <div className="img_box">
                    <img src="/images/14_베이_라인드_클로그_2.jpg" alt="크록스 꾸미기" />
                </div>
                <div className="text_box">
                    <h3 className="come_as_title">Come As You Are</h3>
                    <p>
                        당신만의 취향을 가득 담은
                        <br />
                        하나뿐인 크록스를 만들어 보세요.
                    </p>
                </div>

                <Link to="/">크록스 꾸미기</Link>
            </div>
        </div>
    );
};

export default ComeAsPopup;
