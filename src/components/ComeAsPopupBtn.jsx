import React from 'react';
import './scss/comeAsBtn.scss';

const ComeAsPopupBtn = ({ onOpen }) => {
    return (
        <div className="come_as_btn">
            <button onClick={onOpen}>Come As You Are</button>
        </div>
    );
};

export default ComeAsPopupBtn;
