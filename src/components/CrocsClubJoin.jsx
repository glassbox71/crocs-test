import React, { useState } from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { loginAuthStore } from "../store/loginStore";
import "./scss/CrocsClubJoin.scss";

const CrocsClubJoin = () => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // firebase 로그인 상태 가져오기
  const { user } = loginAuthStore();

  const handleClubJoin = () => {
    if (user) {
      // 로그인 되어 있으면 CrocsClub 페이지로 이동
      navigate("/crocsclub");
    } else {
      //  로그인 안 되어 있으면 팝업 표시
      setShowLoginPopup(true);
    }
  };

  const handleLoginRedirect = () => {
    // 로그인 페이지로 이동
    navigate("/login");
    setShowLoginPopup(false);
  };

  const handlejoinRedirect = () => {
    // 로그인 페이지로 이동
    navigate("/join");
    setShowLoginPopup(false);
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
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
        <button className="club_join_btn" onClick={handleClubJoin}>
          CrocsClub Join
        </button>
      </div>

      {/*  로그인 필요 팝업 */}
      {showLoginPopup && (
        <div className="login_popup_overlay" onClick={closePopup}>
          <div className="login_popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup_close" onClick={closePopup}>
              ✕
            </button>
            <h3>로그인이 필요합니다</h3>
            <p>
              CrocsClub 가입 혜택을 받으시려면
              <br />
              먼저 로그인해주세요.
            </p>
            <div className="popup_buttons">
              <button className="login_btn" onClick={handleLoginRedirect}>
                로그인하기
              </button>
              <button className="login_btn" onClick={handlejoinRedirect}>
                회원가입하기
              </button>
              <button className="cancel_btn" onClick={closePopup}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrocsClubJoin;
