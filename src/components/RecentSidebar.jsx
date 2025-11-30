import React, { useEffect } from "react";
import { useRecentProductsStore } from "../store/recentProductsStore";
import Title from "../components/Title";
import "./scss/RecentSidebar.scss";
import { useNavigate } from "react-router-dom";

const RecentSidebar = ({ isOpen, onClose }) => {
  const { recentProducts, clearAll } = useRecentProductsStore();
  const navigate = useNavigate();
  const formatPrice = (price, discountPrice) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // 브라우저 콘솔에서 확인
  localStorage.getItem("recent-products-storage");
  // 이 부분은 제거하거나 개발 환경에서만 실행
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "저장된 데이터:",
        localStorage.getItem("recent-products-storage")
      );
    }
  }, [recentProducts]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && onClose) {
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

  const formatDate = (date) => {
    const now = new Date();
    const viewed = new Date(date);
    const diffMs = now - viewed;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "방금 전";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return viewed.toLocaleDateString("ko-KR");
  };

  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <div
        className={`recent-side-container ${isOpen ? "open" : ""}`}
        style={{ zIndex: isOpen ? 1001 : 1000 }}
      >
        <div className="recent-inner">
          <div className="recent-side-products-wrap">
            <div className="recent-side-product">
              <Title title="Recent" />
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
              {recentProducts.length > 0 && (
                <div className="header-info">
                  <span className="count">{recentProducts.length}개</span>
                  <button className="clear-btn" onClick={clearAll}>
                    전체 삭제
                  </button>
                </div>
              )}
            </div>

            {recentProducts.length == 0 ? (
              <div className="recent-side-products__empty">
                <div className="empty-icon">👀</div>
                <p>최근 본 상품이 없습니다</p>
              </div>
            ) : (
              <div className="recent-side-products__list">
                {recentProducts.map((item) => (
                  <div
                    key={item.id}
                    className="product-item"
                    onClick={() => navigate(item.link)} // 링크 이동추가
                    style={{ cursor: "pointer" }} // 클릭 표시
                  >
                    <div className="product-meta">
                      <span className="viewed-time">
                        {formatDate(item.viewedAt)}
                      </span>
                      {/* 리뷰별점표시 */}
                      {/* {item.rating && (
                                <span className='rating'>
                                    ⭐ {item.rating} ({item.reviewCount})
                                </span>
                            )} */}
                    </div>
                    <div className="product_imgbox">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="product_textbox">
                      <h3 className="product-name">{item.name}</h3>
                      {/* <p className='product-category'>{item.category}</p> */}
                      {/* <div className='product-price-wrap'>
                        <span className='price-text'>
                          {item.discountPrice == ""
                            ? item.price
                            : item.discountPrice}
                        </span>
                        <span className='price-text'>
                          {item.discountPrice == "" ? "" : item.originPrice}
                        </span>
                        {item.discount && (
                          <span className='discount'>{item.discount}%</span>
                        )}
                      </div> */}
                    </div>

                    <div className="product-actions">
                      {/* <button  className="remove-btn"
                onClick={() => removeProduct(product.id)}
                aria-label="삭제"
              >
                ✕
              </button> */}
                      {/* <button className="cart-btn">장바구니</button> */}
                      {/* <button className="buy-btn">구매하기</button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentSidebar;
