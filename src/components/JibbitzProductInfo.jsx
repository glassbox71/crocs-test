import React, { useState, useCallback } from 'react';
import { wishListStore } from '../store/wishListStore';
import WishAddPopup from './WishAddPopup';

const JibbitzProductInfo = ({ product }) => {
    const [count] = useState(1);
    const { wishLists, onAddWishList, onProductAddCart } = wishListStore();

    const [CrocsProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const onHeart = wishLists.some((item) => item.id === product.id);

    // 가격 파싱 유틸 (문자열 내 숫자만 추출)
    const parsePriceNumber = useCallback((p) => {
        if (!p) return 0;
        const num = String(p).replace(/[^0-9]/g, '');
        return Number(num || 0);
    }, []);

    const salePriceNumber = parsePriceNumber(CrocsProduct?.prices?.[0]);
    const totalPrice = salePriceNumber * quantity;
    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <div className="product-info__wrap" aria-labelledby="product-title">
            <div className="product-info">
                <div className="product-info__title_wrap">
                    <p className="product-info__subtitle">
                        {product.title.includes('세트') ? 'Jibbitz pack' : 'Jibbitz single'}
                    </p>
                    <h2 className="product-info__title">{product.title}</h2>
                    <div className="product-info__price">
                        <span className="product-info__price_dc_rate">
                            {product?.discountPrice || product?.price}
                        </span>
                        <span className="product-info__price_breadcrumbs__line"></span>
                        <span className="product-info__price_sale">
                            {product.discountPrice !== '' ? product.discountPercent : ''}
                        </span>
                        <span className="product-info__price_breadcrumbs__line"></span>
                        <span className="product-info__price_cost">
                            {product.discountPrice !== '' ? product?.price : ''}
                        </span>
                    </div>
                </div>
                <div className="product-info__snswish_wrap">
                    <div className="product-sns-wrap"></div>
                    <div className="product-wish-btn">
                        <p
                            className={`wish-btn ${onHeart ? 'active' : 'normal'}`}
                            onClick={() => onAddWishList(product)}
                        >
                            <img src="/images/icon-love_line.svg" alt="wishIcon" />
                        </p>
                    </div>
                </div>

                <div className="product-info_breadcrumbs"></div>

                <div className="product-info_select">
                    <div className="product-info__wrap">
                        <div className="product-info-select_chose-item">
                            <span className="product-info-select_chose-item-name">
                                {product.title}
                            </span>
                        </div>
                    </div>
                    <div className="product-info-select__count-wrap">
                        <div className="product-info-select__count">
                            <div className="product-info-select__count-value-wrap">
                                <p className="product-info-select__count-value">
                                    <span>{quantity}</span>
                                </p>
                                {/* 수량 버튼 */}
                                <div className="select-buy__select__wrap">
                                    <button
                                        type="button"
                                        className="select-buy__select__count-btn select-buy__select__count-btn--increase"
                                        onClick={increaseQty}
                                    >
                                        <span className="select-buy__select__count-link select-buy__select__count-link--disabled-1">
                                            <img
                                                src="/images/icon-arrow-up_bold-1.svg"
                                                alt="증가"
                                            />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="select-buy__select__count-btn select-buy__select__count-btn--decrease"
                                        onClick={decreaseQty}
                                        disabled={quantity <= 1}
                                    >
                                        <span className="select-buy__select__count-link select-buy__select__count-link--disabled-1">
                                            <img
                                                src="/images/icon-arrow-down_bold-1.svg"
                                                alt="감소"
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="select-buy__breadcrumbs"></div>
                {/* 총 금액 */}
                <div className="select-buy__total-wrap">
                    <div className="select-buy__total-title">
                        <p>총 상품 금액</p>
                    </div>
                    <div className="select-buy__total-content">
                        <div className="select-buy__total-number-wrap">
                            <p className="total-number-text">수량: {quantity}</p>
                        </div>
                        <div className="select-buy__total-price-wrap">
                            <p className="total-price">₩{totalPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="select-buy__breadcrumbs" />
                {/* 구매버튼 */}
                <div className="select-buy__buy-btns-wrap">
                    <p
                        className={`select-buy ${onHeart ? 'active' : 'normal'}`}
                        onClick={() => onAddWishList(product)}
                    >
                        <img src="/images/icon-love_line.svg" alt="wishIcon" />
                    </p>
                    <button
                        className="select-buy__buy-btn select-buy__buy-btn--add-cart"
                        type="button"
                        onClick={() => onProductAddCart(product, count)}
                    >
                        장바구니
                    </button>
                    <WishAddPopup />
                    <button
                        className="select-buy__buy-btn select-buy__buy-btn--buy-now"
                        type="button"
                    >
                        구매하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JibbitzProductInfo;
