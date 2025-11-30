import React, { useState } from 'react';
import './scss/WomenComponents.scss';

export default function FilterMenu({
    selectedColors = [],
    selectedSize = null,
    onRemoveColor,
    onRemoveSize,
}) {
    const [isOpen, setIsOpen] = useState(true);
    const hasFilters = selectedColors.length > 0 || selectedSize !== null;

    const handleToggle = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    if (!hasFilters) {
        return null; // 필터가 없으면 표시 안 함
    }

    return (
        <div className="filter-menu">
            <div className="filter-menu__wrap menu_wrap-style">
                <div className="filter-menu__wrap--title_wrap title--wrap">
                    <h3 className="filter-menu__wrap--title title">필터</h3>
                    <button
                        className="filter-menu--title__toggle title--toggle"
                        onClick={handleToggle}
                    >
                        <img
                            src={
                                isOpen
                                    ? '/images/Sub_Women_Images/icon-minus.svg'
                                    : '/images/Sub_Women_Images/icon-plus.svg'
                            }
                            alt={isOpen ? '줄이기 버튼' : '더보기 버튼'}
                        />
                    </button>
                </div>

                {isOpen && (
                    <ul className="filter-menu__wrap filter-menu__wrap--color">
                        {/* 선택된 색상들 표시 */}
                        {/* {selectedColors.map((color, index) => (
                            <li key={`color-${index}`} className="filter-menu__item">
                                <div className="filter-item-content">
                                    <div
                                        className={`filter-menu__select_color ${color.class}`}
                                        style={{
                                            backgroundColor: Array.isArray(color.value)
                                                ? color.value[0]
                                                : color.value,
                                        }}
                                    />
                                </div>
                                <button
                                    className="filter-menu__close-link"
                                    onClick={() => onRemoveColor(color)}
                                >
                                    <img
                                        src="/images/Sub_Women_Images/icon-close_cross.svg"
                                        alt="필터 제거"
                                        className="close-btn"
                                    />
                                </button>
                            </li>
                        ))} */}
                        {selectedColors.map((color, index) => {
                            const bgColor = Array.isArray(color.value)
                                ? color.value[0]
                                : color.value || color.code || color.hex || null;

                            // 텍스트로 쓸 label/name/class 자동 감지
                            const colorName =
                                color.label ||
                                color.name ||
                                color.class ||
                                (Array.isArray(color.value) ? color.value[0] : color.value);

                            return (
                                <li key={`color-${index}`} className="filter-menu__item">
                                    <div className="filter-item-content">
                                        {/* 색상칩 */}
                                        <div
                                            className="filter-menu__select_color"
                                            style={{ backgroundColor: bgColor }}
                                        />

                                        {/* 텍스트 추가 */}
                                        <span className="filter-color-name">{colorName}</span>
                                    </div>

                                    <button
                                        className="filter-menu__close-link"
                                        onClick={() => onRemoveColor(color)}
                                    >
                                        <img
                                            src="/images/Sub_Women_Images/icon-close_cross.svg"
                                            alt="필터 제거"
                                            className="close-btn"
                                        />
                                    </button>
                                </li>
                            );
                        })}

                        {/* 선택된 사이즈 표시 */}
                        {selectedSize && (
                            <li className="filter-menu__item">
                                <div className="filter-item-content">
                                    <span className="filter-size-name">사이즈: {selectedSize}</span>
                                </div>
                                <button className="filter-menu__close-link" onClick={onRemoveSize}>
                                    <img
                                        src="/images/Sub_Women_Images/icon-close_cross.svg"
                                        alt="필터 제거"
                                        className="close-btn"
                                    />
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
