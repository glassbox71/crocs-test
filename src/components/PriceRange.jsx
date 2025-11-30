import React from 'react';
import './scss/WomenComponents.scss';

export default function WomenPriceRange({ min, max, isActive, onClick }) {
    const formatPrice = (price) => {
        if (price === null) return '';
        return price.toLocaleString();
    };

    const getPriceLabel = () => {
        if (max === null) {
            return `${formatPrice(min)} ~`;
        }
        return `${formatPrice(min)} ~ ${formatPrice(max)}`;
    };

    return (
        <li className="price-menu__item">
            <button
                className={`price-menu__link btn-menu-style ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onClick && onClick({ min, max });
                }}
            >
                {getPriceLabel()}
            </button>
        </li>
    );
}
