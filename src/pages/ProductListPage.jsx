import React, { useEffect, useState } from "react";
import { useCrocsProductStore } from "../store/useCrocsProductStore";
import LeftNavigation from "../components/LeftNavigation";
import ProductCard from "../components/ProductCard";
import "./scss/productListpage.scss";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { menuList } from "../store/menuList";
import Title from "../components/Title";
import { useCrocsSizeStore } from "../store/useCrocsSizeStore";
import { useColorFilterStore } from "../store/useColorFilterStore";
import { useRecentProductsStore } from "../store/recentProductsStore";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category"); // "Classic"

  // 최근 본 상품
  const { addRecent } = useRecentProductsStore();

  const location = useLocation();

  // --- size store ---
  const { crocsSizesByCategory, onFetchSize } = useCrocsSizeStore();

  // --- product store ---
  const {
    crocsItems = [],
    onFetchItems,
    filterByMenu,
    searchWord,
    setSearchWord,
  } = useCrocsProductStore();

  // --- color filter store ---
  const { selectedColors } = useColorFilterStore();

  const navigate = useNavigate();
  const { cate, subcategory } = useParams();

  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getKoreanCategoryName = (englishCategory) => {
    const reverseMap = {
      classic: "클로그",
      clog: "클로그",
      sandal: "샌들",
      platform: "플랫폼",
      sneaker: "스니커즈",
      sneakers: "스니커즈",
      boots: "부츠",
      echo: "에코",
      fuzz: "퍼즈",
      fleece: "퍼즈",
      lined: "퍼즈",
      new: "신상품",
      women: "여성",
      men: "남성",
      kids: "키즈",
      collabs: "콜라보",
    };
    const result = reverseMap[englishCategory.toLowerCase()];
    console.log(`매핑: ${englishCategory} → ${result || englishCategory}`);

    return result || englishCategory;
  };

  // all 페이지인지 체크
  const isAllPage = location.pathname.startsWith("/all");

  // 최초 로딩
  useEffect(() => {
    onFetchItems();
    onFetchSize();
  }, [onFetchItems, onFetchSize]);

  // 검색어 URL → store
  useEffect(() => {
    if (searchQuery) setSearchWord(searchQuery);
  }, [searchQuery, setSearchWord]);

  // 카테고리/검색 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [cate, subcategory, searchWord, categoryQuery]); // categoryQuery 추가

  // 1) ALL 페이지 - 전체 상품으로 시작
  let filteredItems = isAllPage
    ? crocsItems
    : filterByMenu(cate, subcategory) || [];

  // 2) 카테고리(탭) 필터 - categoryQuery 사용
  if (categoryQuery) {
    console.log("=== 카테고리 필터 디버깅 ===");
    console.log("categoryQuery:", categoryQuery);

    const koreanCategory = getKoreanCategoryName(categoryQuery);
    console.log("변환된 한글:", koreanCategory);

    const low = koreanCategory.toLowerCase();
    console.log("소문자 변환:", low);

    filteredItems = filteredItems.filter((item) => {
      const categories =
        item.cate?.split(",").map((c) => c.trim().toLowerCase()) || [];
      const productLow = item.product?.toLowerCase() || "";
      const subcategoryLow = item.subcategory?.toLowerCase() || "";

      const match =
        categories.some((cat) => cat.includes(low)) ||
        productLow.includes(low) ||
        subcategoryLow.includes(low);

      // 매칭된 것만 로그
      if (match) {
        console.log(" 매칭:", item.product);
      }

      return match;
    });

    console.log("필터 후 상품 수:", filteredItems.length);
  }

  // 3) 검색어 필터
  if (searchWord) {
    const lower = searchWord.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.product.toLowerCase().includes(lower) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lower))
    );
  }

  // 4) 카테고리 기반 사이즈 자동 지정
  const normalizeCate = (cateString) => {
    if (!cateString) return null;
    const lower = cateString.toLowerCase();
    if (lower.includes("kid") || lower.includes("키즈")) return "kids";
    if (lower.includes("women") || lower.includes("여성")) return "women";
    if (lower.includes("men") || lower.includes("남성")) return "men";
    return null;
  };

  filteredItems = filteredItems.map((item) => {
    const cateKey = normalizeCate(item.cate);
    const autoSizes = cateKey ? crocsSizesByCategory?.[cateKey] || [] : [];
    return { ...item, sizes: autoSizes };
  });

  // 5) 사이즈 필터
  if (selectedSize) {
    const sizeNum = Number(selectedSize);
    filteredItems = filteredItems.filter(
      (item) => Array.isArray(item.sizes) && item.sizes.includes(sizeNum)
    );
  }
  // if (selectedSize) {
  //       const sizeNum = Number(selectedSize);
  //       if (!isNaN(sizeNum)) {
  //           filteredItems = filteredItems.filter(
  //               (item) => Array.isArray(item.sizes) && item.sizes.includes(sizeNum)
  //           );
  //       }
  //   }

  // 6) 색상 필터
  if (selectedColors.length > 0) {
    filteredItems = filteredItems.filter((item) => {
      const productColors = Array.isArray(item.color)
        ? item.color
        : [item.color];

      return selectedColors.some((selected) => {
        const selectedValues = Array.isArray(selected.value)
          ? selected.value
          : [selected.value];
        return productColors.some((pColor) => selectedValues.includes(pColor));
      });
    });
  }

  // 7) 페이징
  const itemsPerPage = 12;
  const totalPage = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(start, start + itemsPerPage);

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

  // UI 서브카테고리
  const currentMenu = menuList.find((m) => m.key === cate);

  const subCategoryList = [
    ...new Set(
      filteredItems.flatMap(
        (item) =>
          item.subcategory?.split(",")?.map((sc) => sc.trim().toLowerCase()) ||
          []
      )
    ),
  ];

  // all 페이지일 때는 categoryQuery 사용
  const displayCategory = isAllPage ? "ALL" : cate?.toUpperCase() || "ALL";
  const mainItem = filteredItems.find(
    (item) => item.cate?.toLowerCase() === cate?.toLowerCase()
  );
  const mainCategory = isAllPage
    ? categoryQuery
    : mainItem
    ? mainItem.cate
    : cate;
  const mainSubcategory =
    subcategory || (mainItem?.subcategory?.split(",")[0] ?? null);

  return (
    <div className="sub_page">
      <div className="inner">
        <div className="jibbitz_list_wrap">
          <div className="product_list_page">
            <Title title={displayCategory} />

            {/* 검색결과 */}
            {searchWord && (
              <div className="search_info_wrap">
                <div className="search_info">
                  {`" ${searchWord} " 검색 결과 : `}
                  <p>
                    <strong>{filteredItems.length}</strong>개
                  </p>
                </div>
                <button
                  className="clear_search_info_btn"
                  onClick={() => {
                    setSearchWord("");
                    navigate(isAllPage ? "/all" : `/${cate}`);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* 서브 메뉴 (Jibbitz 스타일 유지) */}
            {currentMenu?.submenu_list?.length > 0 && !searchWord && (
              <div className="sub_menu_wrap">
                {currentMenu.submenu_list.map((sub) => (
                  <div
                    key={sub.key}
                    className={`btn_menu_item ${
                      subcategory === sub.key ? "active" : ""
                    }`}
                    onClick={() => navigate(`/${cate}/${sub.key}`)}
                  >
                    <button className="sub_menu_btn">{sub.label}</button>
                  </div>
                ))}
              </div>
            )}

            <div className="product_list_wrap">
              <div className="list_left">
                <LeftNavigation
                  category={mainCategory}
                  subcategory={mainSubcategory}
                  subCategoryList={subCategoryList}
                  selectedSize={selectedSize}
                  onSizeSelect={setSelectedSize}
                />
              </div>

              <div className="list_right">
                {currentItems.length > 0 ? (
                  <ul className="product-card__item_list">
                    {currentItems.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onClick={() => {
                          // 최근 본 상품으로 보내기
                          addRecent({
                            id: p.id,
                            name: p.product,
                            image: Array.isArray(p.product_img)
                              ? String(p.product_img[0])
                              : String(p.product_img).split(",")[0],
                            price: p.price?.toLocaleString() || "",
                            discountPrice:
                              p.discountPrice?.toLocaleString() || "",
                            originPrice: p.originPrice?.toLocaleString() || "",
                            discount: p.discount || "",
                            link: `/product/${p.id}`, // 리스트 페이지는 항상 일반 상품
                            viewedAt: new Date(),
                          });
                          navigate(`/product/${p.id}`);
                        }}
                        onSizeSelect={setSelectedSize}
                      />
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

export default ProductListPage;
