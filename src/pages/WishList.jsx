import React from 'react';
import WishListCard from '../components/WishListCard';
import Title from '../components/Title';
import './scss/wishlist.scss';

const WishList = () => {
    return (
        <div className="sub_page wishlist_page">
            <div className="inner">
                <Title title="WishList" />
                <WishListCard />
            </div>
        </div>
    );
};

export default WishList;
