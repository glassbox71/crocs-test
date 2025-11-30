import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./scss/breadcrumbs.scss";

export default function Breadcrumbs({ category, subcategory }) {
  const navigate = useNavigate();

  const handleClose = () => {
    // if (subcategory) {
    //     // 서브카테고리가 있으면 메인 카테고리로 이동
    //     navigate(`/${category}`);
    // } else {
    //     // 서브카테고리가 없으면 홈으로 이동
    //     navigate('/');
    // }

    // Jibbitz 페이지인 경우
    if (category?.toLowerCase() === "jibbitz") {
      if (subcategory && subcategory.toLowerCase() !== "all") {
        // 서브카테고리가 있고 All이 아니면 All 페이지로
        navigate("/jibbitz/all");
      } else {
        // All 페이지이거나 서브카테고리 없으면 홈으로
        navigate("/");
      }
    } else {
      // 일반 카테고리 페이지
      if (subcategory) {
        // 서브카테고리가 있으면 메인 카테고리로 이동
        navigate(`/${category}`);
      } else {
        // 서브카테고리가 없으면 홈으로 이동
        navigate("/");
      }
    }
  };

  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__list--home">
          <Link to="/" className="breadcrumbs__list--home_link">
            <img src="/images/Sub_Women_Images/icon-home.svg" alt="홈 버튼" />
          </Link>
        </li>

        <li className="breadcrumbs__list--section">
          <span>:</span>
        </li>

        {/* 메인 카테고리 */}
        <li className="breadcrumbs__list--women">
          <Link to={`/${category}`} className="breadcrumbs__list--women_link">
            <span>{category.toUpperCase()}</span>
          </Link>
          <button className="close_btn" onClick={handleClose}>
            <img
              src="/images/Sub_Women_Images/icon-close_cross.svg"
              alt="닫기 버튼"
            />
          </button>
        </li>

        {/* 서브 카테고리 */}
        {subcategory && (
          <>
            <li className="breadcrumbs__list--section">
              <span>:</span>
            </li>
            <li className="breadcrumbs__list--Fur-lined">
              <Link
                to={`/${category}/${subcategory}`}
                className="breadcrumbs__list--Fur-lined_link"
              >
                <span>{subcategory.toUpperCase()}</span>
              </Link>
              <button className="close_btn" onClick={handleClose}>
                <img
                  src="/images/Sub_Women_Images/icon-close_cross.svg"
                  alt="닫기 버튼"
                />
              </button>
            </li>
          </>
        )}
      </ul>

      <div className="breadcrumbs__title">
        <h2>
          {subcategory
            ? `${category.toUpperCase()} : ${subcategory.toUpperCase()}`
            : category.toUpperCase()}
        </h2>
      </div>
    </div>
  );
}
