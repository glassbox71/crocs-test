import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/CartSidebar.scss";
import Title from "../components/Title";
import { Products } from "../data/CrocsProductsData.js";
import { useCartStore } from "../store/useCartStore";

function CartSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const {
    cartProducts,
    selectedProducts,
    isOrderComplete,
    freeShippingThreshold,
    initializeCart,
    getSubtotal,
    getSelectedSubtotal,
    getShipping,
    getTotal,
    getSelectedTotal,
    handleSelectAll,
    handleSelectProduct,
    handleRemoveProduct,
    handleRemoveSelected,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleOrderAll,
    handleOrderSelected,
    handleGiftSelected,
  } = useCartStore();

  // 장바구니 초기화
  // useEffect(() => {
  //   initializeCart(Products);
  // }, []);
   useEffect(() => {
    initializeCart(Products);
  }, [initializeCart]);


  // 가격 계산
  const subtotal = getSubtotal();
  // const selectedSubtotal = getSelectedSubtotal();
  const shipping = getShipping();
  const total = getTotal();
  // const selectedTotal = getSelectedTotal();

  // 금액 포맷팅
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR");
  };

  //  주문 페이지로 이동
  const handleToOrder = (type) => {
    let orderData;

    if (type === "all") {
      if (cartProducts.length === 0) {
        alert("장바구니에 상품이 없습니다.");
        return;
      }
      orderData = handleOrderAll();
    } else {
      if (selectedProducts.size === 0) {
        alert("선택된 상품이 없습니다.");
        return;
      }
      orderData = handleOrderSelected();
    }

    if (!orderData) {
      return;
    }

    //  사이드바 닫기
    onClose();

    navigate("/order", {
      state: {
        orderProducts: orderData.products,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
      },
    });
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // 배경 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`cart-side-container ${isOpen ? "open" : ""}`}
        style={{ zIndex: isOpen ? 1001 : 1000 }}
      >
        <div className="cart-inner">
          <Title title="Cart" />
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <div className="cart-side-content">
            {/* 왼쪽: 상품 목록 */}
            <div className="cart-side-top">
              <div className="product-header">
                <div className="select-all">
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        cartProducts.length > 0 &&
                        selectedProducts.size === cartProducts.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <span>
                      전체선택 ({selectedProducts.size}/{cartProducts.length})
                    </span>
                  </label>
                </div>
                <button
                  className="btn-remove-selected"
                  onClick={handleRemoveSelected}
                >
                  선택삭제
                </button>
              </div>

              <div className="product-list">
                {cartProducts.length === 0 ? (
                  <div className="empty-cart">
                    <p>장바구니에 담긴 상품이 없습니다.</p>
                  </div>
                ) : (
                  cartProducts.map((product) => (
                    <div
                      key={`${product.id}-${product.size || "default"}`}
                      className="product-item-wrap"
                    >
                      <input
                        type="checkbox"
                        className="product-checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                      <div
                        key={product.id}
                        className="product-item"
                        onClick={() => navigate(product.link)} // 링크 이동추가
                        style={{ cursor: "pointer" }} // 클릭 표시
                      >
                        <div className="product-image">
                          <img src={product.product_img} alt={product.name} />
                        </div>

                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          {product.size && (
                            <p className="product-option">
                              사이즈: {product.size}
                            </p>
                          )}

                          <div className="quantity-control">
                            <button
                              className="quantity-btn"
                              onClick={() => handleDecreaseQuantity(product.id)}
                              disabled={product.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="quantity-display">
                              {product.quantity}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() => handleIncreaseQuantity(product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="product-price">
                          <span className="price">
                            {formatPrice(product.price * product.quantity)}원
                          </span>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemoveProduct(product.id)}
                            title="상품 삭제"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 오른쪽: 주문 요약 */}
            <div className="cart-side-bottom">
              {/* 가격 요약 */}
              <div className="price-summary">
                <div className="price-row">
                  <span className="price-label">주문상품</span>
                  <span className="price-value">{formatPrice(subtotal)}원</span>
                </div>
                {cartProducts.length > 0 && (
                  <>
                    <div className="price-row">
                      <span className="price-label">배송비</span>
                      <span
                        className={`price-value ${
                          shipping === 0 ? "free-shipping" : ""
                        }`}
                      >
                        {shipping === 0
                          ? "무료배송"
                          : `+${formatPrice(shipping)}원`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="shipping-notice">
                        {formatPrice(freeShippingThreshold)}원 이상 구매 시
                        무료배송
                      </p>
                    )}
                  </>
                )}

                <div className="price-row total-row">
                  <span className="price-label total-label">
                    최종 결제 금액
                  </span>
                  <span className="price-value total-value">
                    {formatPrice(total)}원
                  </span>
                </div>
              </div>

              {/* 주문 버튼들 */}
              {!isOrderComplete ? (
                <div className="order-buttons">
                  <button
                    className="btn-order-all"
                    onClick={() => handleToOrder("all")}
                  >
                    전체상품주문하기
                  </button>

                  <div className="btn-group">
                    <button
                      className="btn-order-selected"
                      onClick={() => handleToOrder("selected")}
                    >
                      선택상품주문
                    </button>

                    <button
                      className="btn-gift-selected"
                      onClick={handleGiftSelected}
                    >
                      선택상품선물
                    </button>
                  </div>
                </div>
              ) : (
                <div className="order-complete">
                  <div className="complete-icon">✓</div>
                  <p className="complete-text">주문이 완료되었습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
