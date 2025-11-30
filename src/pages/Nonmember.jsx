import React, { useState } from "react";
import Title from "../components/Title";
import "./scss/Nonmember.scss";
import CrocsClubJoin from "../components/CrocsClubJoin";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';

const Nonmember = () => {
  // const navigate = useNavigate();
  const [ordererName, setOrdererName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [password, setPassword] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  // 금액 포맷팅
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR");
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    const d = new Date(date.seconds ? date.seconds * 1000 : date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(
      2,
      "0"
    )}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  // 주문 상태 표시
  const getStatusText = (status) => {
    const statusMap = {
      pending: "결제 완료",
      processing: "배송 준비중",
      shipped: "배송중",
      delivered: "배송 완료",
      cancelled: "주문 취소",
    };
    return statusMap[status] || "알 수 없음";
  };

  // 주문 조회
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrderData(null);

    if (!ordererName.trim() || !orderId.trim() || !password.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    try {
      // Firestore의 orders 컬렉션에서 주문 검색
      const ordersRef = collection(db, "nonmemberOrders");
      const q = query(ordersRef, where("orderId", "==", orderId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("주문 내역을 찾을 수 없습니다. 주문번호를 확인해주세요.");
        return;
      }

      // 주문 데이터 가져오기
      const orderDoc = querySnapshot.docs[0];
      const order = orderDoc.data();

      // 주문자명 확인
      if (order.userName !== ordererName) {
        setError("주문자명이 일치하지 않습니다.");
        return;
      }

      // 비밀번호 확인 (실제로는 해시된 비밀번호를 비교해야 하지만, 여기서는 간단히 처리)
      // 주문 시 저장된 비밀번호와 비교
      if (order.password !== password) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 조회 성공
      setOrderData(order);
    } catch (err) {
      console.error("주문 조회 오류:", err);
      setError("주문 조회 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="sub_page">
      <div className="inner">
        <div className="nonmember_wrap">
          <Title subTitle="비회원 주문 조회" />

          {!orderData ? (
            <>
              <form className="nonmember_form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="주문자명"
                  value={ordererName}
                  onChange={(e) => setOrdererName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="주문번호"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="비회원 주문조회 비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error_message">{error}</p>}
                <button type="submit">주문조회</button>
              </form>
              <CrocsClubJoin />
            </>
          ) : (
            <div className="order_result">
              <div className="order_info_section">
                <h3>주문 정보</h3>
                <div className="info_row">
                  <span className="label">주문번호:</span>
                  <span className="value">{orderData.orderId}</span>
                </div>
                <div className="info_row">
                  <span className="label">주문일시:</span>
                  <span className="value">
                    {formatDate(orderData.orderDate)}
                  </span>
                </div>
                <div className="info_row">
                  <span className="label">주문상태:</span>
                  <span className="value status">
                    {getStatusText(orderData.status)}
                  </span>
                </div>
                <div className="info_row">
                  <span className="label">주문자명:</span>
                  <span className="value">{orderData.userName}</span>
                </div>
              </div>

              <div className="order_products_section">
                <h3>주문 상품</h3>
                {orderData.products.map((product, index) => (
                  <div key={index} className="product_item">
                    <div className="product_img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product_details">
                      <p className="product_name">{product.name}</p>
                      <p className="product_option">색상: {product.color}</p>
                      <p className="product_option">사이즈: {product.size}</p>
                      <p className="product_quantity">
                        수량: {product.quantity}개
                      </p>
                      <p className="product_price">
                        {formatPrice(product.price * product.quantity)}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order_summary_section">
                <h3>결제 정보</h3>
                <div className="summary_row">
                  <span className="label">상품 금액:</span>
                  <span className="value">
                    {formatPrice(orderData.subtotal)}원
                  </span>
                </div>
                <div className="summary_row">
                  <span className="label">배송비:</span>
                  <span className="value">
                    {orderData.shipping === 0
                      ? "무료배송"
                      : `${formatPrice(orderData.shipping)}원`}
                  </span>
                </div>
                <div className="summary_row total">
                  <span className="label">총 결제금액:</span>
                  <span className="value">
                    {formatPrice(orderData.total)}원
                  </span>
                </div>
              </div>

              <button
                className="back_button"
                onClick={() => {
                  setOrderData(null);
                  setOrdererName("");
                  setOrderId("");
                  setPassword("");
                }}
              >
                다른 주문 조회하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nonmember;
