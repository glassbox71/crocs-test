import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    return (
        <li className={`category__list-item ${category.backgroundColor}`}>
            <Link
                to={`/all?category=${encodeURIComponent(category.name)}`}
                className="category__link"
            >
                <img src={category.image} alt={category.alt} className="category__image" />
                <p className="category__label">{category.name}</p>
            </Link>
        </li>
    );
};

export default CategoryItem;
