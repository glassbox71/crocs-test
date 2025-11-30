import React, { useEffect, useRef } from "react";
import "./scss/Cart.scss";
import Title from "../components/Title";
import { Products } from "../data/CrocsProductsData.js";
import CartProgress from "../components/CartProgress";
import { useCartStore } from "../store/useCartStore";
import { wishListStore } from "../store/wishListStore";
import { useNavigate } from "react-router-dom";
import { collaboAuthStore } from "../store/collaboAuthStore.js";

function Cart() {
  const cartStore = useCartStore();
  const wishStore = wishListStore();
  const navigate = useNavigate();

  // 초기화 여부 추적
  const isInitialized = useRef(false);

  const {
    cartProducts,
    selectedProducts,
    isOrderComplete,
    freeShippingThreshold,
    initializeCart,
    addFromWishlist,
    mergeCartData,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } = cartStore || {};

  // wishListStore에서 cartWishItems와 cartItems 가져오기
  const { cartItems = [], cartWishItems = [] } = wishStore || {};

  // console.log("Cart 렌더링:", {
  //   cartProducts,
  //   cartItems,
  //   cartWishItems,
  //   cartProductsLength: cartProducts?.length,
  //   cartItemsLength: cartItems?.length,
  //   cartWishItemsLength: cartWishItems?.length,
  // });

  // 장바구니 초기화 및 동기화
  useEffect(() => {
    console.log("useEffect 실행:", {
      isInitialized: isInitialized.current,
      cartItemsLength: cartItems.length,
      cartWishItemsLength: cartWishItems.length,
    });

    // 초기 로드 시 한 번만 초기화
    if (!isInitialized.current) {
      console.log(" 장바구니 초기화 실행");
      initializeCart(Products, cartWishItems);
      isInitialized.current = true;
    }

    // 장바구니에 상품 상세(cartItems)에서 추가된 상품 병합
    if (cartItems.length > 0) {
      console.log("🛒 cartItems 병합:", cartItems);

      mergeCartData(Products, cartItems);

      //  병합 완료 후 cartItems 초기화!
      wishListStore.setState({ cartItems: [] });
    }

    // 위시리스트(cartWishItems)에서 장바구니로 추가된 상품 병합
    if (cartWishItems.length > 0) {
      console.log(" cartWishItems 병합:", cartWishItems);

      addFromWishlist(Products, cartWishItems);

      // 병합 후 cartWishItems 초기화!
      wishListStore.setState({ cartWishItems: [] });
    }
  }, [cartItems, cartWishItems]);

  //지비츠 데이터 로드하고 이동
  const handleNavigate = (product) => {
    if (product.link.includes("/jibbitz/")) {
      // 지비츠 데이터가 store에 없으면 fetch
      const jibbitzStore = collaboAuthStore.getState();
      const exists = jibbitzStore.jibbitzItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (!exists) {
        // 지비츠 데이터를 아직 로드하지 않았다면 fetch 후 navigate
        jibbitzStore.onFetchJibbitz().then(() => {
          navigate(product.link);
        });
        return;
      }
    }
    navigate(product.link);
  };

  // 가격 계산
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // const selectedSubtotal = getSelectedSubtotal();
  // const selectedTotal = getSelectedTotal();

  // 금액 포맷팅
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR");
  };

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

    navigate("/order", {
      state: {
        orderProducts: orderData.products,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
      },
    });
  };

  return (
    <div className="cart-container">
      <div className="inner">
        <Title title="Cart" />
        <CartProgress />
        <div className="cart-content">
          {/* 왼쪽: 상품 목록 */}
          <div className="cart-left">
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
                    <div className="product-item">
                      <div
                        key={product.id}
                        className="product-image"
                        onClick={() => {
                          console.log("product.link:", product.link);
                          handleNavigate(product);
                        }} // 링크 이동추가
                        style={{ cursor: "pointer" }}
                      >
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
          <div className="cart-right">
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
                <span className="price-label total-label">최종 결제 금액</span>
                <span className="price-value total-value">
                  {formatPrice(total)}원
                </span>
              </div>
            </div>

            {/* 안내문구 */}
            <div className="terms-content">
              <p className="terms-description">
                장바구니 상품은 30일간 보관됩니다. 장기간 보관을 원하실 경우
                위시리스트에 추가해주세요. <br />
                교차 및 복수 할인 프로모션 적용 주문 건의 경우 부분 취소 및
                반품은 불가하며, 전체 취소/반품 후 재주문해주셔야합니다.
              </p>
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
  );
}

export default Cart;
