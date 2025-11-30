import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import UserInfoTop from '../components/UserInfoTop';
import './scss/userinfo.scss';
import { Link, useNavigate } from 'react-router-dom';
import { wishListStore } from '../store/wishListStore';
import OrderState from '../components/OrderState';
import { loginAuthStore } from '../store/loginStore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useRecentProductsStore } from '../store/recentProductsStore';

const UserInfo = () => {
    const { wishLists } = wishListStore();
    const { recentProducts } = useRecentProductsStore();
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    // props로 전달할 주문 데이터
    const [orders, setOrders] = useState([]);
    const { user } = loginAuthStore();

    // 주문 데이터 불러오기
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userOrders = userData.orders || [];

                // 최신순 정렬
                const sorted = userOrders.sort((a, b) => {
                    const dateA = a.orderDate?.toDate
                        ? a.orderDate.toDate()
                        : new Date(a.orderDate);
                    const dateB = b.orderDate?.toDate
                        ? b.orderDate.toDate()
                        : new Date(b.orderDate);
                    return dateB - dateA;
                });

                setOrders(sorted);
            }
        };

        fetchOrders();
    }, [user]);

    useEffect(() => {
        if (wishLists.length === 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [wishLists]);

    return (
        <div className="sub_page userinfo_page">
            <div className="inner">
                <Title title="My Page" />
                {/* 마이 페이지 회원정보
                이름 / 크록스 클럽 가입 여부 / 쿠폰 정보 */}
                {/* <button className="logout_btn">Logout</button> */}
                <UserInfoTop />
                <div className="user_btn_wrap">
                    {/* 마이 페이지 탭 버튼
                나의 정보 / 주문 정보 / 1:1 문의 /  */}
                    <button>나의 정보</button>
                    <button onClick={() => navigate('/orderhistory')}>주문 정보</button>
                    <button onClick={() => navigate('/coupons')}>혜택 정보</button>
                    <button>1 : 1 문의</button>
                </div>
                <div className="userinfo_current_order_wrap">
                    <div className="user_menu_top">
                        {/* 주문 처리 현황 */}
                        <h4>주문 처리 현황</h4>
                        <Link to="/orderhistory">더보기</Link>
                    </div>
                    <hr />
                    <div className="user_menu_bottom">
                        <OrderState orders={orders} />
                    </div>
                </div>
                <div className="userinfo_recentOrder_wrap">
                    <div className="user_menu_top">
                        {/* 최근 본 상품 */}
                        <h4>최근 본 상품</h4>
                        <Link to="/recent">더보기</Link>
                    </div>
                    <hr />
                    <div className={`user_menu_bottom ${active ? 'active' : ''}`}>
                        {recentProducts.slice(0, 4).map((item) => (
                            <div key={item.id} className="wish_card">
                                <div className="wish_card_imgbox">
                                    <img src={item.image} alt={item.name} />
                                    {console.log(item.image)}
                                </div>
                                <div className="wish_card_textbox">
                                    <p>{item.name}</p>
                                    <div className="wish_card_price">
                                        <p>
                                            <span>
                                                {item.discountPrice === ''
                                                    ? item.price
                                                    : item.discountPrice}
                                            </span>
                                            <span>
                                                {item.discountPrice === '' ? '' : item.originPrice}
                                            </span>
                                        </p>
                                        <p className="price_bottom">{item.discountPercent}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
                <div className="userinfo_wishlist_wrap">
                    <div className="user_menu_top">
                        {/* 위시리스트 */}
                        <h4>WishList</h4>
                        <Link to="/wishlist">더보기</Link>
                    </div>
                    <hr />
                    <div className={`user_menu_bottom ${active ? 'active' : ''}`}>
                        {wishLists.slice(0, 4).map((item) => (
                            <div key={item.id} className="wish_card">
                                <div className="wish_card_imgbox">
                                    <img src={item.imageUrl} alt={item.title} />
                                </div>
                                <div className="wish_card_textbox">
                                    <p>{item.title}</p>
                                    <div className="wish_card_price">
                                        <p>
                                            <span>{item.price}</span>
                                            <span>{item.price}</span>
                                        </p>
                                        <p className="price_bottom">{item.discountPercent}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
