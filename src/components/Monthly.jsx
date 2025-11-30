import React, { useState } from 'react';
import MonthlyLeft from './MonthlyLeft';
import MonthlyRight from './MonthlyRight';
import ButtonWrap from './ButtonWrap';
import './scss/monthly.scss';

const Monthly = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSlide = () => {
        setIsActive(true); // 클릭하면 오른쪽 패널 active
    };

    return (
        <section className="monthly_wrap">
            <div className="inner">
                <MonthlyLeft />
                <ButtonWrap onClick={toggleSlide} btnText="here!" isActive={isActive} />
                <MonthlyRight isActive={isActive} />
            </div>
        </section>
    );
};

export default Monthly;
