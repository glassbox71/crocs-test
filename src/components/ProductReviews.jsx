import { useState } from "react";
import "./scss/ProductReviews.scss";
import { reviewsData } from "../data/reviewData";

const ProductReviews = ({ productId }) => {
  //  모든 훅은 최상단에서 선언
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //  훅 다음에 데이터 가져오기
  const reviewData = reviewsData[productId];

  if (!reviewData) {
    return <div className="product-reviews">리뷰 데이터가 없습니다.</div>;
  }

  const { rollup, reviews } = reviewData;
  const reviewsPerPage = 10;

  //  필터 + 정렬
  const getFilteredReviews = () => {
    let filtered = [...reviews];

    if (filterRating !== null) {
      filtered = filtered.filter(
        (r) => Number(r.metrics.rating) === filterRating
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.details.created_date - a.details.created_date;
        case "helpful":
          return (
            (b.metrics.helpful_votes || 0) - (a.metrics.helpful_votes || 0)
          );
        case "rating":
          return b.metrics.rating - a.metrics.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filtered = getFilteredReviews();

  const indexLast = currentPage * reviewsPerPage;
  const indexFirst = indexLast - reviewsPerPage;
  const currentReviews = filtered.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filtered.length / reviewsPerPage);

  const renderStars = (rating) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="product-reviews">
      {/* 요약 */}
      <div className="review-summary">
        <div className="average-rating">
          <span className="rating-number">{rollup.average_rating}</span>
          {renderStars(Math.round(rollup.average_rating))}
        </div>
        <p>총 {rollup.review_count}개의 리뷰</p>
        <p>{Math.round(rollup.recommended_ratio * 100)}%가 추천합니다</p>
      </div>

      {/* 필터/정렬 */}
      <div className="review-controls">
        <div className="filter-buttons">
          <button
            className={filterRating === null ? "active" : ""}
            onClick={() => setFilterRating(null)}
          >
            전체
          </button>

          {[5, 4, 3, 2, 1].map((n) => (
            <button
              key={n}
              className={filterRating === n ? "active" : ""}
              onClick={() => setFilterRating(n)}
            >
              {n}점 (
              {reviews.filter((r) => Number(r.metrics.rating) === n).length})
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">최신순</option>
          <option value="helpful">도움순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* 리뷰 목록 */}
      <div className="review-list">
        {currentReviews.length === 0 ? (
          <p>리뷰가 없습니다.</p>
        ) : (
          currentReviews.map((review) => (
            <div key={review.ugc_id} className="review-item">
              <div className="review-header">
                <div className="user-info">
                  <span>{review.details.nickname || "익명"}</span>
                  {renderStars(review.metrics.rating)}
                </div>
                <span className="date">
                  {formatDate(review.details.created_date)}
                </span>
              </div>

              <h4>{review.details.headline}</h4>
              <p>{review.details.comments}</p>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
