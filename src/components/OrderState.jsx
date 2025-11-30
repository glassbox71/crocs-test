import React from "react";
import { Link } from "react-router-dom";
import "./scss/orderstate.scss";

const OrderState = ({ orders = [] }) => {
  // 주문 상태별 카운트
  const getCounts = () => {
    const counts = {
      pending: 0, // 입금대기
      processing: 0, // 상품&배송 준비중
      shipped: 0, // 배송중
      delivered: 0, // 배송완료
      cancelled: 0, // 취소
      exchange: 0, // 교환
      return: 0, // 반품
    };

    orders.forEach((order) => {
      if (order.status === "pending") counts.pending++;
      else if (order.status === "processing") counts.processing++;
      else if (order.status === "shipped") counts.shipped++;
      else if (order.status === "delivered") counts.delivered++;
      else if (order.status === "cancelled") counts.cancelled++;
      // exchange와 return은 별도 처리 필요 (향후 구현)
    });

    return counts;
  };

  const counts = getCounts();

  return (
    <div className="state_wrap">
      <ul className="order_state_left">
        <li>
          <Link to="#">
            <span>{counts.pending}</span>
          </Link>
          <span>입금대기</span>
        </li>
        <li>
          <Link to="#">
            <span>{counts.processing}</span>
          </Link>
          <span>상품&배송 준비중</span>
        </li>
        <li>
          <Link to="#">
            <span>{counts.shipped}</span>
          </Link>
          <span>배송중</span>
        </li>
        <li>
          <Link to="#">
            <span>{counts.delivered}</span>
          </Link>
          <span>배송완료</span>
        </li>
      </ul>
      <ul className="order_state_right">
        <li>
          <strong>
            취소<span>주문건</span>
          </strong>
          <Link to="#">
            <span>{counts.cancelled}</span>건
          </Link>
        </li>
        <li>
          <strong>
            교환<span>주문건</span>
          </strong>
          <Link to="#">
            <span>{counts.exchange}</span>건
          </Link>
        </li>
        <li>
          <strong>
            반품<span>주문건</span>
          </strong>
          <Link to="#">
            <span>{counts.return}</span>건
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OrderState;
