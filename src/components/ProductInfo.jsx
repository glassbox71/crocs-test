import React, { useState, useCallback } from "react";
import "./scss/ProductDetail.scss";

const ProductInfo = () => {
  const [selectedSize, setSelectedSize] = useState(220);
  const [selectedColor, setSelectedColor] = useState("brown");
  const [count, setCount] = useState(1);

  const handleSizeClick = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const handleColorClick = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleDecrease = useCallback(() => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  }, []);

  const sizes = [210, 220, 230, 240, 250, 260, 265, 270, 280, 290, 300, 310];
  const colors = [
    { id: 1, name: "black", label: "블랙" },
    { id: 2, name: "brown", label: "브라운" },
    { id: 3, name: "pink", label: "핑크" },
    { id: 4, name: "green", label: "그린" },
    { id: 5, name: "blue", label: "블루" },
  ];

  return (
    <section className="product-info__wrap" aria-labelledby="product-title">
      <div className="product-info">
        <div className="product-info__title_wrap">
          <p className="product-info__subtitle">
            Classic Unforgettable Suede Clog
          </p>
          <h2 className="product-info__title">
            클래식 언퍼게터블 스웨이드 클로그
          </h2>
          <div className="product-info__price">
            <span className="product-info__price_dc_rate">55,900</span>
            <span className="product-info__price_breadcrumbs__line"></span>
            <span className="product-info__price_sale">20%</span>
            <span className="product-info__price_breadcrumbs__line"></span>
            <span className="product-info__price_cost">69,900</span>
          </div>
        </div>

        <div className="product-info_breadcrumbs"></div>

        <div className="product-info_color">
          <div className="product-info__color-title-wrap">
            <p className="product-info__color-title">색상</p>
            <span className="product-info__price_breadcrumbs__line"></span>
            <p className="product-info__color-select">
              {colors.find((c) => c.name === selectedColor)?.label || "브라운"}
            </p>
          </div>
          <div
            className="product-info__color-badge-wrap"
            role="group"
            aria-label="색상 선택"
          >
            {colors.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`color-badge color-badge--${color.name} ${
                  selectedColor === color.name ? "active" : ""
                }`}
                onClick={() => handleColorClick(color.name)}
                aria-label={`${color.label} 선택`}
                aria-pressed={selectedColor === color.name}
              />
            ))}
          </div>
        </div>

        <div className="product-info_size">
          <div className="product-info_size-title-wrap">
            <p className="product-info_size-title">사이즈</p>
            <span className="product-info_size_breadcrumbs__line"></span>
            <p className="product-info_size-select">{selectedSize}</p>
          </div>
          <div className="product-info_size-btns-wrap">
            <ul
              className="product-info_size-btns"
              role="group"
              aria-label="사이즈 선택"
            >
              {sizes.map((size) => (
                <li key={size}>
                  <button
                    type="button"
                    onClick={() => handleSizeClick(size)}
                    className={selectedSize === size ? "active" : ""}
                    aria-label={`사이즈 ${size} 선택`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
            <div className="product-info_size-notice-wrap">
              <span>원하는 옵션이 없으신가요?</span>
              <div>
                <button type="button" className="product-info_size-restock-btn">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-bell.svg`}
                    alt="재입고 알림 아이콘"
                  />
                  <span>재입고 알림 신청하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="product-info_breadcrumbs"></div>

        <div className="product-info_select">
          <div className="product-info__wrap">
            <div className="product-info-select_chose-item">
              <span
                className={`info__color-badge info__color-badge--${selectedColor}`}
              ></span>
              <span className="product-info-select_chose-item-name">
                클래식 언퍼게터블 스웨이드 클로그
              </span>
            </div>
            <span className="product-info__price_breadcrumbs__line"></span>
            <span className="product-info-select_chose-item-option">
              {selectedSize}
            </span>
          </div>
          <div className="product-info-select__count-wrap">
            <div className="product-info-select__count">
              <div className="product-info-select__count-value-wrap">
                <p className="product-info-select__count-value">
                  <span>{count}</span>
                </p>
                <div className="product-info-select__wrap">
                  <button
                    type="button"
                    className="product-info-select__count-btn product-info-select__count-btn--increase"
                    onClick={handleIncrease}
                  >
                    <span className="product-info-select__count-link product-info-select__count-link--disabled-1">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-arrow-up_bold-1.svg`}
                        alt="수량 증가 버튼"
                        className="count-btn__icon-1"
                      />
                    </span>
                    <span className="product-info-select__count-link product-info-select__count-link--disabled-2">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-arrow-up_bold-2.svg`}
                        alt="수량 증가 버튼 비활성화"
                        className="count-btn__icon-2"
                      />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="product-info-select__count-btn product-info-select__count-btn--decrease"
                    onClick={handleDecrease}
                    disabled={count <= 1}
                  >
                    <span className="product-info-select__count-link product-info-select__count-link--disabled-1">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-arrow-down_bold-1.svg`}
                        alt="수량 감소 버튼"
                        className="count-btn__icon-1"
                      />
                    </span>
                    <span className="product-info-select__count-link product-info-select__count-link--disabled-2">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-arrow-down_bold-2.svg`}
                        alt="수량 감소 버튼 비활성화"
                        className="count-btn__icon-2"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-info_breadcrumbs"></div>
      </div>
    </section>
  );
};

export default ProductInfo;
