import React from 'react';
import Title from './Title';

const MonthlyLeft = () => {
    return (
        <div className="monthly_left">
            <Title
                title={`MONTHLY <br/> Crocs`}
                subTitle="Your Crocs. Your Story. Your World. <br/> 월간 크록스 속, 당신만의 크록스를 찾아보세요."
            />
            <p className="jibbitz jibbitz_img1">
                <img src="/images/monthly_zibbitz_01.svg" alt="zibbitz_img1" />
            </p>
            <p className="jibbitz jibbitz_img2">
                <img src="/images/monthly_zibbitz_02.svg" alt="zibbitz_img2" />
            </p>
            <p className="jibbitz jibbitz_img3">
                <img src="/images/monthly_zibbitz_03.svg" alt="zibbitz_img3" />
            </p>
        </div>
    );
};

export default MonthlyLeft;
