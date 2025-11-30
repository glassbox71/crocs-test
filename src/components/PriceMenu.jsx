import React, { useState } from 'react';
import PriceRange from './PriceRange';
import './scss/WomenComponents.scss';

export default function WomenPriceMenu({ onPriceSelect }) {
    const [activeRange, setActiveRange] = useState(null);
    
    const priceRanges = [
        { min: 0, max: 20000 },
        { min: 20000, max: 40000 },
        { min: 40000, max: 60000 },
        { min: 60000, max: 80000 },
        { min: 80000, max: 100000 },
        { min: 100000, max: null }
    ];

    const handlePriceClick = (range) => {
        const rangeKey = `${range.min}-${range.max}`;
        setActiveRange(rangeKey);
        onPriceSelect && onPriceSelect(range);
    };

    return (
        <div className="price-menu">
            <div className="price-menu__wrap menu_wrap-style">
                <div className="price-menu__wrap--title_wrap title--wrap">
                    <h3 className="price-menu__wrap--title title">가격</h3>
                    <button className="price-menu--title__toggle title--toggle">
                        <img
                            src="/images/Sub_Women_Images/icon-minus.svg"
                            alt="줄이기/더보기 버튼"
                        />
                    </button>
                </div>
                <ul className="price-menu__wrap price-menu__wrap--price-range">
                    {priceRanges.map((range, index) => (
                        <PriceRange
                            key={index}
                            min={range.min}
                            max={range.max}
                            isActive={activeRange === `${range.min}-${range.max}`}
                            onClick={handlePriceClick}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
