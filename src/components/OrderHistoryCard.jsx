import React from "react";
import "./scss/orderhistory.scss";

const OrderHistoryCard = ({ order }) => {
  // 날짜 포맷팅
  const formatDate = (date) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // 금액 포맷팅
  const formatPrice = (price) => {
    return price?.toLocaleString("ko-KR") || "0";
  };

  // 주문 상태 한글 변환
  const getStatusText = (status) => {
    const statusMap = {
      pending: "주문접수",
      processing: "상품준비중",
      shipped: "배송중",
      delivered: "배송완료",
      cancelled: "주문취소",
    };
    return statusMap[status] || status;
  };

  if (!order) {
    return null;
  }

  return (
    <div className="order_list_card">
      {/* 주문 상단 - 날짜, 주문번호, 상세보기 */}
      <div className="order_list_top">
        <div className="order_list_top_left">
          <p>{formatDate(order.orderDate)}</p>
          <p>({order.orderId})</p>
        </div>
        <div className="order_list_top_right">
          <button onClick={() => alert("상세보기 기능은 준비 중입니다.")}>
            상세보기
          </button>
        </div>
      </div>

      {/* 주문 상품 목록 */}
      {order.products &&
        order.products.map((product, idx) => (
          <div key={idx} className="order_list_middle">
            <div className="order_list_imgbox">
              <img
                src={product.image || "/images/default-product.png"}
                alt={product.name}
              />
            </div>
            <div className="order_list_textbox">
              <p className="product_name">{product.name}</p>
              <p className="product_details">
                색상: {product.color} / 사이즈: {product.size}
              </p>
              <p className="product_price_quantity">
                {formatPrice(product.price)}원 / {product.quantity}개
              </p>
            </div>
          </div>
        ))}

      {/* 주문 하단 - 주문상태, 결제금액 */}
      <div className="order_list_bottom">
        <div className="order_list_pricebox">
          <p className="order_status">
            <span className={`status_badge status_${order.status}`}>
              {getStatusText(order.status)}
            </span>
          </p>
          <p className="price_details">
            상품구매금액 {formatPrice(order.subtotal)}원 + 배송비{" "}
            {formatPrice(order.shipping)}원 - 총 할인금액 0원 =
            <strong> 총 결제금액 {formatPrice(order.total)}원</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
