import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAuthStore } from '../store/loginStore';

const UserInfoTop = () => {
    const { user } = loginAuthStore();
    const navigate = useNavigate();

    if (!user) return null; //  중요! user 준비가 안 되면 렌더링 X

    const isClubMember = user.isClubMember === true;

    // 사용 가능한 쿠폰 개수 계산
    const availableCoupons = user.coupons?.filter((coupon) => !coupon.isUsed) || [];
    const couponCount = availableCoupons.length;

    const handleJoin = () => {
        navigate('/crocsclub');
    };

    return (
        <div className="user_info_top">
            {/* 미가입자 영역 */}
            {!isClubMember && (
                <div className="user_info_left_wrap">
                    <p className="user_info_text">
                        안녕하세요. <strong>{user.name || user.nickname || user.email}</strong>님
                    </p>
                    <p>크록스로 나만의 스타일을 완성해보세요.</p>

                    <button className="club_join_btn" onClick={handleJoin}>
                        Crocs Club Join
                    </button>
                </div>
            )}

            {/* 가입자 영역 */}
            {isClubMember && (
                <div className="user_info_left_wrap club_join_wrap">
                    <p>
                        안녕하세요. <strong>{user.name || user.nickname || user.email}</strong>님
                    </p>
                    <p>크록스로 나만의 스타일을 완성해보세요.</p>

                    <div className="club_join">
                        <strong>Crocs Club</strong>
                    </div>
                </div>
            )}

            {/* 오른쪽 고정 영역 */}
            <div className="user_info_right">
                <div className="coupons_text">
                    <strong>쿠폰</strong>
                    <p className="coupon_count">{couponCount}개</p>
                </div>

                <div className="divider"></div>

                <div className="coupon_popup_link">
                    <button className="view_coupons_btn" onClick={() => navigate('/coupons')}>
                        쿠폰함 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoTop;
