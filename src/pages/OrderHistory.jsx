import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderState from "../components/OrderState";
import OrderHistoryCard from "../components/OrderHistoryCard";
import { loginAuthStore } from "../store/loginStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./scss/orderhistory.scss";
import Title from "../components/Title";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = loginAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("사용자 데이터:", userData);

          // orders 배열을 최신순으로 정렬
          const userOrders = userData.orders || [];
          console.log("주문 데이터:", userOrders);

          const sortedOrders = userOrders.sort((a, b) => {
            const dateA = a.orderDate?.toDate
              ? a.orderDate.toDate()
              : new Date(a.orderDate);
            const dateB = b.orderDate?.toDate
              ? b.orderDate.toDate()
              : new Date(b.orderDate);
            return dateB - dateA; // 최신순
          });

          setOrders(sortedOrders);
          console.log("정렬된 주문:", sortedOrders);
        } else {
          console.log("사용자 문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("주문 내역 불러오기 실패:", error);
        alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="sub_page">
        <div className="inner">
          <p>주문 내역을 불러오는 중...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="sub_page orderhistory_page">
      <div className="inner">
        <Title title="Order History" />
        {/* <div className="user_btn_wrap">
                    <button className="user_home_btn" onClick={() => navigate('/userinfo')}>
                        <img src="" alt="" />
                        <span>마이페이지 홈으로 이동하기</span>
                    </button>
                </div> */}

        <div className="userinfo_current_order_wrap">
          <div className="user_menu_top">
            <h4>주문 처리 현황</h4>
          </div>
          <hr />
          <div className="user_menu_bottom">
            <OrderState orders={orders} />
          </div>
        </div>

        <div className="order_history_top">
          <div className="user_menu_top">
            <h4>주문 내역 ({orders.length})</h4>
          </div>
          <hr />
        </div>

        {orders.length === 0 ? (
          <div className="empty_orders">
            <p>주문 내역이 없습니다.</p>
            <button onClick={() => navigate("/all")}>쇼핑하러 가기</button>
          </div>
        ) : (
          <div className="order_history_list">
            {orders.map((order, index) => (
              <OrderHistoryCard key={order.orderId || index} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
