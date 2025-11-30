import React, { useState } from 'react';
import './scss/WomenComponents.scss';

export default function SizeMenu({ sizes = [], selectedSize, onSizeSelect }) {
    const [isOpen, setIsOpen] = useState(true);
     const [activeSize, setActiveSize] = useState(selectedSize || null);

    const handleClick = (size, e) => {
        e.preventDefault();
        const newSize = selectedSize === size ? null : size;
        setActiveSize(newSize);
        onSizeSelect?.(newSize); // 상위로 선택 사이즈 전달
    };

    const handleToggle = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="size-menu">
            <div className="size-menu__wrap">
                <div className="size-menu__wrap--title_wrap title--wrap">
                    <h3 className="size-menu__wrap--title title">사이즈</h3>
                    <button className="filtering_menu_toggle" onClick={handleToggle}>
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
                    <ul className="size-menu__wrap size-menu__wrap--size">
                        {sizes.map((size) => (
                            <li key={size} className="size-menu__item">
                                <button
                                    className={`size-menu__link btn-menu-style ${
                                        selectedSize === size ? 'active' : ''
                                    }`}
                                    onClick={(e) => handleClick(size, e)}
                                >
                                    {size}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
