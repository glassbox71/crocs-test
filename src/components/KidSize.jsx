import React, { useState } from 'react';
import './scss/KidSize.scss';

const KidSize = () => {
    const [isVisible, setIsVisible] = useState(true);

    // 영유아 사이즈
    const infantSizes = [
        { kr: 98, us: 'C2' },
        { kr: 107, us: 'C3' },
        { kr: 115, us: 'C4' },
        { kr: 120, us: 'C5' },
        { kr: 130, us: 'C6' },
        { kr: 140, us: 'C7' },
        { kr: 150, us: 'C8' },
        { kr: 155, us: 'C9' },
        { kr: 165, us: 'C10' },
    ];

    //키즈 사이즈
    const kidsSizes = [
        { kr: 175, us: 'C11' },
        { kr: 180, us: 'C12' },
        { kr: 190, us: 'C13' },
        { kr: 200, us: 'J1' },
        { kr: 210, us: 'J2' },
        { kr: 220, us: 'J3' },
        { kr: 230, us: 'J4' },
        { kr: 240, us: 'J5' },
        { kr: 250, us: 'J6' },
    ];

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="crocs_kid_size_table">
            <div className="size_table_header">
                <h2 className="size_table_title">
                    <span className="mini_title">crocs</span> 사이즈 가이드
                </h2>
                <button className="close_button" onClick={handleClose}>
                    ×
                </button>
            </div>

            <div className="size_description">
                <div className="description_box">
                    <span>크록스의 신발 사이즈 차트로 완벽한 핏을 찾으세요.</span>
                </div>
            </div>

            <div className="size_tips">
                <p className="tip_text">
                    <strong>Tip.</strong> 찾는 사이즈가 없다면 한단계 큰 사이즈를 선택해주세요. (예:
                    175가 없다면, 180 선택).
                </p>
                <p className="tip_note">
                    * 각 상품은 측정 방법에 따라 10~20mm의 사이즈 오차가 있을 수 있습니다.
                </p>
            </div>

            <div className="size_table_wrapper">
                <table className="size_table">
                    <thead className="infant_section">
                        <tr>
                            <th colSpan="10" className="baby_header">
                                영,유아 👶
                            </th>
                        </tr>
                    </thead>
                    <tbody className="infant_body">
                        <tr className="size_label_row">
                            <td className="label_cell">
                                한국 사이즈
                                <br />
                                (밀리미터)
                            </td>
                            {infantSizes.map((size, index) => (
                                <td key={index} className="kr_size">
                                    {size.kr}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="label_cell">미국 사이즈</td>
                            {infantSizes.map((size, index) => (
                                <td key={index} className="us_size">
                                    {size.us}
                                </td>
                            ))}
                        </tr>
                    </tbody>

                    <thead className="kids_section">
                        <tr>
                            <th colSpan="10" className="kids_header">
                                키즈 (6세 이상) 👧🧒
                            </th>
                        </tr>
                    </thead>
                    <tbody className="kids_body">
                        <tr className="size_label_row">
                            <td className="label_cell">
                                한국 사이즈
                                <br />
                                (밀리미터)
                            </td>
                            {kidsSizes.map((size, index) => (
                                <td key={index} className="kr_size">
                                    {size.kr}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="label_cell">미국 사이즈</td>
                            {kidsSizes.map((size, index) => (
                                <td key={index} className="us_size">
                                    {size.us}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="size_note">
                <p>
                    위 사이즈 변환표는 크록스 공식 가이드를 기준으로 제작되었습니다. 제품에 따라
                    차이가 있을 수 있습니다.
                </p>
            </div>

            {/* 발측정 */}
            <div className="measure_section">
                <div className="measure_title">
                    <h3>아이의 발사이즈 측정 방법</h3>
                    <p>
                        아래 단계를 따라 아이에게 적합한 사이즈를 찾아보세요. <br /><strong>아이의 발은 금방
                        자라므로 확신이 서지 않으면 한 사이즈 크게 선택하는 것을 권장합니다.</strong>
                    </p>
                </div>

                <div className="measure_steps">
                    <div className="step_item">
                        <div className="img_box">
                            <img
                                src="/images/KidSize1.JPG"
                                alt="어린이신발사이즈측정"
                            />
                        </div>
                        <div className="text_box">
                            <h4>1. 벽이 있는 장소와 종이 한 장을 준비하기</h4>
                            <p>
                                바닥에 종이를 평평하게 내려놓습니다.<br/> 종이의 한쪽 끝이 벽과 직각을
                                이뤄야 합니다.<br /> 아이가 종이 위에 올라 발 뒷꿈치를 벽에 붙이도록
                                합니다.
                            </p>
                        </div>
                    </div>

                    <div className="step_item">
                        <div className="img_box">
                            <img src="/images/KidSize2.JPG" alt="어린이신발사이즈측정" />
                        </div>
                        <div className="text_box">
                            <h4>2. 발 모양을 따라 그리고 길이 재기</h4>
                            <p>
                                볼펜 또는 연필로 발가락을 따라 그립니다.그 다음에 <br/>자 또는 줄자로
                                발가락 끝에서 종이 끝까지의 길이를 잽니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KidSize;
