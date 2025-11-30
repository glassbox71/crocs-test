import React from 'react';
import { Link } from 'react-router-dom';

const PromotionItem = ({ promotion, onClick }) => {
    return (
        <li className="category__promotion-item">
            <Link
                className="category__promotion-link"
                onClick={(e) => onClick(e, promotion.link)}
                aria-label={`${promotion.title} 프로모션 보기`}
            >
                <img
                    src={promotion.image}
                    alt={promotion.alt}
                    className="category__promotion-image"
                />
                <div className="category__promotion-textbox">
                    <div className="category__promotion-title_wrap">
                        <h3 className="category__promotion-title">{promotion.title}</h3>
                    </div>
                    <p className="category__promotion-subtitle">{promotion.subtitle}</p>
                    <p className="category__promotion-desc">{promotion.description}</p>
                </div>
            </Link>
        </li>
    );
};

export default PromotionItem;
