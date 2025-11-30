import React, { useState } from 'react';
import "./scss/AdultSize.scss"

const AdultSize = () => {
  const [isVisible, setIsVisible] = useState(true);

  // 사이즈 데이터
  const sizes = [
    { kr: 210, usWomen: 4, usMen: 2 },
    { kr: 220, usWomen: 5, usMen: 3 },
    { kr: 230, usWomen: 6, usMen: 4 },
    { kr: 240, usWomen: 7, usMen: 5 },
    { kr: 250, usWomen: 8, usMen: 6 },
    { kr: 260, usWomen: 9, usMen: 7 },
    { kr: 265, usWomen: 10, usMen: 8 },
    { kr: 270, usWomen: 11, usMen: 9 },
    { kr: 280, usWomen: 12, usMen: 10 },
    { kr: 290, usWomen: "─", usMen: 11 },
    { kr: 300, usWomen: "─", usMen: 12 },
    { kr: 310, usWomen: "─", usMen: 13 },
    { kr: 320, usWomen: "─", usMen: 14 },
  ];

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="crocs_size_table">
      <div className="size_table_header">
        <h2 className="size_table_title">
          <span className='mini_title'>crocs</span> 사이즈 가이드
        </h2>
        <button 
          className="close_button"
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <div className="size_tabs">
        <div className="size_tab">
          <span>크록스의 신발 사이즈 차트로 완벽한 핏을 찾으세요.</span>
        </div>
      </div>

      <div className="size_tips">
        <p className="tip_text">
          <strong>Tip : </strong> 찾는 사이즈가 없다면 한단계 큰 사이즈를 선택해주세요. 
          (예: 265가 없다면, 270 선택).
        </p>
        <p className="tip_text">
          발 볼이 넓거나 발 등이 넓을 경우 정 사이즈를 추천드립니다.
        </p>
        <p className="tip_note">
          * 각 상품은 측정 방법에 따라 10~20mm의 사이즈 오차가 있을 수 있습니다.
        </p>
      </div>

      <div className="size_table_wrapper">
        <table className="size_table">
          <thead>
            <tr>
              <th>한국 사이즈<br />(밀리미터)</th>
              <th>미국 사이즈<br />(여성)</th>
              <th>미국 사이즈<br />(남성)</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr key={index}>
                <td className="kr_size">{size.kr}</td>
                <td className="us_size">{size.usWomen}</td>
                <td className="us_size">{size.usMen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="size_note">
        <p>위 사이즈 변환표는 크록스 공식 가이드를 기준으로 제작되었습니다.<br />
          제품에 따라 차이가 있을 수 있습니다.</p>
      </div>
    </div>
  );
};

export default AdultSize;
