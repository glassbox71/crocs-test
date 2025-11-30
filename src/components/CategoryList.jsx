import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <div className="category__list">
      <ul className="category__list-items">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={onCategoryClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
