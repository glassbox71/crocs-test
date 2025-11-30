import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import "./scss/search.scss";
import SearchLeft from "./SearchLeft";
import SearchRight from "./SearchRight";
import { useLocation, useNavigate } from "react-router-dom";
import { useCrocsProductStore } from "../store/useCrocsProductStore";

const Search = ({ scrolled }) => {
  const {
    inputText,
    onInputText,
    onAddRecentSearches,
    searchOpen,
    onCloseSearch,
    setSearchWord,
    onFetchItems,
  } = useCrocsProductStore();

  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  //  검색 모달이 열릴 때 제품 데이터 로드
  useEffect(() => {
    if (searchOpen) {
      console.log("제품 데이터 로드 시작");
      onFetchItems();
      setIsClosing(false); // 열릴 때는 closing 상태 해제
    }
  }, [searchOpen, onFetchItems]);

  // 닫기 핸들러 (애니메이션 포함)
  const handleClose = () => {
    setIsClosing(true); // 닫기 애니메이션 시작
    setTimeout(() => {
      onCloseSearch(); // 0.5초 후 실제로 닫기
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 1. 검색어로 제품 필터링
    setSearchWord(inputText);

    // 2. 최근 검색어에 추가
    onAddRecentSearches(inputText);

    // 3. 입력창 초기화
    onInputText("");

    // 4. 닫기 애니메이션과 함께 검색 모달 닫기
    setIsClosing(true);
    setTimeout(() => {
      onCloseSearch();
      // 5. 검색 결과 페이지로 이동
      navigate(`/all?search=${encodeURIComponent(inputText)}`);
    }, 500);
  };

  const location = useLocation();
  const isSubPage = location.pathname !== "/";

  return (
    <div
      className={`
                search_wrap
                ${searchOpen ? "open" : ""}
                ${isClosing ? "closing" : ""}
                ${isSubPage ? "subpage" : ""}
                ${scrolled ? "scrolled" : ""}
            `}
    >
      <button className="close_btn" onClick={handleClose}>
        <img src="/images/close_btn.svg" alt="close_btn" />
      </button>

      <div className="search_top">
        <SearchInput
          inputText={inputText}
          onChange={(e) => onInputText(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <div className="search_bottom">
        <div className="search_left">
          <SearchLeft />
        </div>

        <div className="search_right">
          <SearchRight />
        </div>
      </div>
    </div>
  );
};

export default Search;
