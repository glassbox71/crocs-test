import React from 'react';
import PromotionItem from './PromotionItem';

const PromotionList = ({ promotions, onPromotionClick }) => {
  return (
    <div className="category__promotions">
      <ul className="category__promotion-list">
        {promotions.map((promotion) => (
          <PromotionItem
            key={promotion.id}
            promotion={promotion}
            onClick={onPromotionClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default PromotionList;
