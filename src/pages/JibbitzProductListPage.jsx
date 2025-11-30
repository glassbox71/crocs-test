import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { collaboAuthStore } from "../store/collaboAuthStore";
import { useCrocsProductStore } from "../store/useCrocsProductStore";
import { useRecentProductsStore } from "../store/recentProductsStore";
import Breadcrumbs from "../components/Breadcrumbs";
import "./scss/productListpage.scss";
import Title from "../components/Title";

const JibbitzProductListPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const {
    jibbitzItems,
    onFetchJibbitz,
    disneyItems,
    selectFilter,
    filteredList,
    onFilterBtn,
  } = collaboAuthStore();

  const navigate = useNavigate();
  const { filter } = useParams();
  const { addRecent } = useRecentProductsStore();

  // Crocs store (검색용)
  const { searchWord, setSearchWord } = useCrocsProductStore();

  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 상품 불러오기
  useEffect(() => {
    onFetchJibbitz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 상품 클릭 시 최근 본 상품에 추가
  const onOpenProductDetail = (product) => {
    // console.log("전체 product 객체:", product); // 먼저 전체 객체 확인
    // console.log("확인1", product.id);
    // 최근 본 상품에 추가
    addRecent({
      id: product.id,
      name: product.title,
      image: product.imageUrl,
      price: product.price,
      discountPrice: product.discountPrice || "",
      originPrice: product.originPrice || "",
      discount: product.discount || "",
      link: `/jibbitz/detail/${product.id}`,
    });

    navigate(`/jibbitz/detail/${product.id}`);
  };

  // URL filter 파라미터가 변경되면 store의 selectFilter 업데이트
  useEffect(() => {
    if (filter) {
      const filterMap = {
        all: "",
        single: "싱글",
        pack: "팩",
        collabo: "콜라보",
      };
      const koreanFilter = filterMap[filter.toLowerCase()] ?? "";
      onFilterBtn(koreanFilter);
    } else {
      onFilterBtn("");
    }
  }, [filter, onFilterBtn]);

  // URL → 검색 store 반영
  useEffect(() => {
    if (searchQuery) setSearchWord(searchQuery);
  }, [searchQuery, setSearchWord]);

  // 검색이나 필터가 바뀌면 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord, selectFilter]);

  // -----------------------------------
  // 1) 지비츠 전용 필터 (전체 / 싱글 / 팩 / 콜라보)
  // -----------------------------------
  const displayList = () => {
    if (selectFilter === "싱글" || selectFilter === "팩") {
      return filteredList;
    }
    if (selectFilter === "콜라보") {
      return disneyItems;
    }
    if (selectFilter === "") {
      return jibbitzItems;
    }
    return jibbitzItems;
  };

  let list = displayList();

  // -----------------------------------
  // 2) 검색 필터
  // -----------------------------------
  if (searchWord) {
    const lower = searchWord.toLowerCase();
    list = list.filter(
      (item) =>
        item.title?.toLowerCase().includes(lower) ||
        item.product?.toLowerCase().includes(lower) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lower))
    );
  }

  // -----------------------------------
  // 3) 페이징 처리
  // -----------------------------------
  const itemsPerPage = 12;
  const totalPage = Math.max(1, Math.ceil(list.length / itemsPerPage));

  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = list.slice(start, start + itemsPerPage);

  const handleGoPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPage) return;
    setCurrentPage(pageNum);
  };

  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const groupStart = currentGroup * pageGroupSize + 1;
  const groupEnd = Math.min(groupStart + pageGroupSize - 1, totalPage);

  const pagerButton = [];
  for (let i = groupStart; i <= groupEnd; i++) {
    pagerButton.push(
      <button
        key={i}
        className={currentPage === i ? "active" : ""}
        onClick={() => handleGoPage(i)}
      >
        {i}
      </button>
    );
  }

  // 필터 버튼 클릭 시 URL 변경
  const handleFilterClick = (filterType) => {
    const filterMap = {
      "": "all",
      싱글: "single",
      팩: "pack",
      콜라보: "collabo",
    };
    const englishFilter = filterMap[filterType];
    navigate(`/jibbitz/${englishFilter}`);
  };

  // 현재 선택된 필터에 따라 subcategory 동적 설정
  const getSubcategory = () => {
    if (selectFilter === "싱글") return "Single";
    if (selectFilter === "팩") return "Pack";
    if (selectFilter === "콜라보") return "Collabo";
    return "All";
  };

  const JibbitzLeftNavigation = {
    category: "Jibbitz",
    subcategory: getSubcategory(),
    filters: [],
  };

  return (
    <div className="sub_page">
      <div className="inner">
        <div className="jibbitz_list_wrap">
          <div className="product_list_page">
            <Title title={"Jibbitz"} />

            {/* 검색결과 */}
            {searchWord && (
              <div className="search_info_wrap">
                <div className="search_info">
                  {`" ${searchWord} " 검색 결과 : `}
                  <p>
                    <strong>{list.length}</strong>개
                  </p>
                </div>
                <button
                  className="clear_search_info_btn"
                  onClick={() => {
                    setSearchWord("");
                    navigate("/jibbitz/all");
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* 서브 메뉴 */}
            <div className="sub_menu_wrap">
              <div className="btn_menu_item">
                <button
                  className={`sub_menu_btn ${
                    selectFilter === "" ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("")}
                >
                  All
                </button>
              </div>

              <div className="btn_menu_item">
                <button
                  className={`sub_menu_btn ${
                    selectFilter === "싱글" ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("싱글")}
                >
                  Single
                </button>
              </div>

              <div className="btn_menu_item">
                <button
                  className={`sub_menu_btn ${
                    selectFilter === "팩" ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("팩")}
                >
                  Pack
                </button>
              </div>

              <div className="btn_menu_item">
                <button
                  className={`sub_menu_btn ${
                    selectFilter === "콜라보" ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("콜라보")}
                >
                  Collabo
                </button>
              </div>
            </div>

            <div className="product_list_wrap">
              <div className="list_left">
                <Breadcrumbs
                  category={JibbitzLeftNavigation.category}
                  subcategory={JibbitzLeftNavigation.subcategory}
                />
              </div>

              {/* 우측 리스트 */}
              <div className="list_right">
                {currentItems.length > 0 ? (
                  <ul className="product-card__item_list">
                    {currentItems.map((product) => (
                      <li
                        className="product-card"
                        key={product.id}
                        onClick={() => onOpenProductDetail(product)}
                      >
                        <div className="product-card__img_wrap">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="product-card__img"
                          />
                        </div>

                        <div className="product-card_name_wrap">
                          <p>{product.title}</p>
                        </div>

                        <div className="product-card_price_wrap">
                          <span className="orginal-price">{product.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty_state">
                    <p>
                      {searchWord
                        ? `"${searchWord}"에 대한 검색 결과가 없습니다.`
                        : "해당 조건에 맞는 상품이 없습니다."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 페이징 */}
        {totalPage > 1 && (
          <div className="page_pager">
            <button onClick={() => handleGoPage(currentPage - 1)}>이전</button>
            {pagerButton}
            <button onClick={() => handleGoPage(currentPage + 1)}>다음</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JibbitzProductListPage;
