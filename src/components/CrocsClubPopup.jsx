import React, { useState } from 'react';
import Title from './Title';
import CrocsClubOption from './CrocsClubOption';
// import { Link } from 'react-router-dom';
import './scss/crocsClubPopup.scss';
import { useNavigate } from 'react-router-dom';
import { loginAuthStore } from '../store/loginStore';

const CrocsClubPopup = () => {
    const navigate = useNavigate();
    const { user, setClubMember } = loginAuthStore();
    const [isValid, setIsValid] = useState(false); // 입력값 검증 상태

    // CrocsClubOption에서 입력값 검증 결과를 받아옴
    const handleValidationChange = (valid) => {
        setIsValid(valid);
    };

    const handleclubJoin = async () => {
        // 로그인 체크
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        // 입력값 검증
        if (!isValid) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        // 이미 가입된 경우
        if (user.isClubMember) {
            alert('이미 크록스 클럽 회원입니다.');
            navigate('/userinfo');
            return;
        }

        // 크록스 클럽 가입 처리
        try {
            await setClubMember(user.uid, true);
            alert('크록스 클럽에 가입되었습니다! 🎉\n첫 주문 15% 할인 쿠폰이 발급되었습니다.');
            navigate('/userinfo');
        } catch (error) {
            console.error('클럽 가입 오류:', error);
            alert('가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="sub_page">
            <div className="inner">
                <div className="crocs_club_popup_wrap">
                    <Title
                        title="Crocs Club"
                        subTitle="크록스 클럽을 가입하고 15%할인 쿠폰 및 다양한 혜택을 받아보세요."
                    />
                    <div className="popup_wrap">
                        <div className="crocs_club_popup_left">
                            <p>
                                <span>1</span> 첫 주문 추가 15% 할인
                            </p>
                            <p>
                                <span>2</span> 신상품 프리뷰
                            </p>
                            <p>
                                <span>3</span> 온라인 단독 할인 & 행사
                            </p>
                            <p>
                                <span>4</span> VIP 세일 & 프라이빗 이벤트
                            </p>
                        </div>
                        <div className="crocs_club_popup_right">
                            {/* 생일 옵션 , 이메일, 체크박스, 동의*/}
                            <CrocsClubOption onValidationChange={handleValidationChange} />
                        </div>
                    </div>
                    <p>
                        <button className="club_join_btn" onClick={handleclubJoin}>
                            Crocs Club Join
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CrocsClubPopup;
