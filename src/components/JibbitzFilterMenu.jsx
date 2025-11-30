import React, { useEffect } from 'react';
import { collaboAuthStore } from '../store/collaboAuthStore';
import './scss/WomenComponents.scss';

const JibbitzFilterMenu = () => {
    const { onFetchJibbitz } = collaboAuthStore();

    // 상품 불러오기
    useEffect(() => {
        onFetchJibbitz();
    }, []);

    return (
        <div className="filter-menu">
            <div className="filter-menu__wrap menu_wrap-style">
                <div className="filter-menu__wrap--title_wrap title--wrap">
                    <h3 className="filter-menu__wrap--title title">필터</h3>
                    <button className="filter-menu--title__toggle title--toggle">
                        <img src="/images/Sub_Women_Images/icon-minus.svg" alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JibbitzFilterMenu;
