"use no memo";

import React, { useState } from "react";
import { wishListStore } from "../store/wishListStore";
import "./scss/wishlistcard.scss";

const WishListCard = () => {
  const { wishLists, onRemoveWish, toggleRemoveWish, onAddCartBtn } =
    wishListStore();

  // 페이징 처리
  // 한페이지에 보여질 개수
  const itemPerPage = 8;
  // 현재 보여지는 페이지를 체크하고 변경하기
  const [currentPage, setCurrentpage] = useState(1);
  // 전체 페이지수 계산하기 - 보여질 아이템개수 / 전체아이템개수의 올림 Math.ceil
  const totalPage = Math.ceil(wishLists.length / itemPerPage);
  // 특정위치를 잘라서 보여주기
  const start = (currentPage - 1) * itemPerPage;
  const currentItems = wishLists.slice(start, start + itemPerPage);

  const handleGoPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPage) return;
    console.log(pageNum);
    setCurrentpage(pageNum);
  };

  //버튼 생성하기
  const pagerButton = () => {
    //버튼을 저장할 배열
    const buttons = [];
    //페이지버튼수를 전체페이지 수만큼 만들기
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "actvie" : ""}
          onClick={() => handleGoPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="wish_inner">
      <div className="wish_card_wrap">
        {currentItems.map((item) => (
          <div key={item.id} className="wish_card">
            <div className="wish_card_imgbox">
              <img src={item.imageUrl} alt={item.title} />
              <input
                type="checkbox"
                className="product-checkbox"
                onChange={() => toggleRemoveWish(item)}
              />
            </div>
            <div className="wish_card_textbox">
              <p>{item.title}</p>
              <div className="wish_card_price">
                <p>
                  <span>
                    {item.discountPrice == "" ? item.price : item.discountPrice}
                  </span>
                  <span>
                    {item.discountPrice == "" ? "" : item.originPrice}
                  </span>
                </p>
                <p className="price_bottom">
                  {/* {(
                                        (1 -
                                            Number(item.discountPrice.replace(/,/g, '')) /
                                                Number(item.originPrice.replace(/,/g, ''))) *
                                        100
                                    ).toFixed(0)}
                                    % */}
                  {item.discountPercent}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pager_btn">
        <button onClick={() => handleGoPage(currentPage - 1)}>이전</button>
        {pagerButton()}
        <button onClick={() => handleGoPage(currentPage + 1)}>다음</button>
      </div>
      <div className="wish_select">
        <button className="wish_remove_btn" onClick={() => onRemoveWish()}>
          선택상품 삭제
        </button>
        <button className="wish_add_btn" onClick={() => onAddCartBtn()}>
          장바구니 추가
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
