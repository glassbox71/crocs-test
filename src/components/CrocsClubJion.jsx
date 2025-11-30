import React from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';

const CrocsClubJion = () => {
    return (
        <div className="crocsclub_wrap">
            <Title subTitle="CrocsClub Benefit" />
            <ul className="benefit_list">
                <li>
                    <span>
                        <img src="/images/benefit_img_01.svg" alt="benefit" />
                    </span>
                    첫 주문 <br />
                    추가 15% 할인
                </li>
                <li>
                    <span>
                        <img src="/images/benefit_img_02.svg" alt="benefit" />
                    </span>
                    온라인 단독 <br />
                    할인 & 행사
                </li>
                <li>
                    <span>
                        <img src="/images/benefit_img_03.svg" alt="benefit" />
                    </span>
                    VIP 세일 & <br />
                    프라이빗 이벤트
                </li>
            </ul>
            {/* <button>CrocsClub Join</button> */}
            <Link to="/crocsclub">CrocsClub Join</Link>
        </div>
    );
};

export default CrocsClubJion;
