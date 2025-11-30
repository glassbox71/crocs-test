import React, { useState, useRef, useEffect } from "react";
import { useNewProductStore } from "../store/useNewProductStore";
import Title from "./Title";
import "./scss/SlideCircle.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SlideCircle = ({ showDot }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [touchStart, setTouchStart] = useState(0);
  // const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);
  const { items, onFetchItem } = useNewProductStore();

  // 상품 불러오기
  useEffect(() => {
    onFetchItem();
  }, []);

  // 상품디테일페이지이동
  const navigate = useNavigate();
  // console.log("확인2", items);

  const onOpenProductMore = (id) => {
    // console.log("확인1", id);
    navigate(`/product/${id}`);
    // e.preventDefault();
  };

  // 모든 슬라이드의 기본 컬러 이름을 미리 저장
  // const defaultColor = items.map((s) =>
  //     Array.isArray(s.color) ? s.color[s.color.length - 1] : ""
  // );

  //  각 슬라이드별 선택 상태를 관리하는 state (배열)
  const [selectedColorNames, setSelectedColorNames] = useState([]);

  // selectedColorNames 초기화
  useEffect(() => {
    if (items.length > 0) {
      const defaultColor = items.map((s) =>
        Array.isArray(s.color) ? s.color[s.color.length - 1] : ""
      );
      setSelectedColorNames(defaultColor);

      // 디버깅: 컬러 리스트 확인
      // console.log("Items color data:", items.map(item => ({
      //     product: item.product,
      //     color: item.color
      // })));
    }
  }, [items]);

  // 슬라이드 하나씩 색을 변경할 때 호출
  const changeColor = (slideIndex, colorName) => {
    setSelectedColorNames((prev) => {
      const updated = [...prev];

      updated[slideIndex] = colorName.trim();
      return updated;
    });
  };

  // 컬러선택 함수로 바꿔서
  const getSelectedColor = (slide, index) => {
    // 1) selectedColorNames가 초기화 안 된 경우
    if (selectedColorNames.length === 0) {
      // slide.color가 있는 경우 → 기본값 반환
      if (Array.isArray(slide.color)) {
        return slide.color[slide.color.length - 1];
      }
      // 기본값 없음 → fallback
      return "#444444";
    }

    // 2) selectedColorNames가 초기화된 후 → 변경된 값 사용
    return selectedColorNames[index] || "#444444";
  };

  // 자동 재생
  useEffect(() => {
    if (isPlaying && items.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, items.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getSlidePosition = (index) => {
    const diff = index - currentSlide;
    const total = items.length;
    let position = diff;

    if (diff > total / 2) {
      position = diff - total;
    } else if (diff < -total / 2) {
      position = diff + total;
    }

    return position;
  };

  // Dots 9개씩 표시
  const maxDots = 9;
  const currentGroup = Math.floor(currentSlide / maxDots); // 현재 슬라이드가 포함된 그룹 번호 (0부터 시작)
  const startIndex = currentGroup * maxDots; // 그룹의 시작 index (0, 9, 18 …)
  const visibleDots = items.slice(startIndex, startIndex + maxDots); // 해당 그룹의 9개 요소만 표시

  return (
    <section className="circle_slide_wrap">
      <div id="container">
        <div id="contents">
          <Title
            title={`Come As You Are`}
            subTitle={`당신의 스타일에 맞는 완벽한 크록스를 찾아보세요`}
          />
          <div className="circle_main">
            <div className="circle_slider">
              <div className="circle_slides">
                {items.map((slide, index) => {
                  const position = getSlidePosition(index);
                  const isCenter = position === 0;
                  const opacity =
                    position < 0
                      ? 0
                      : Math.abs(position) <= 1
                      ? 1 - Math.abs(position) * 0.5
                      : 0;
                  //컬러선택 이름변경
                  // const selectedColor =
                  //     (selectedColorNames.length > 0 &&
                  //         selectedColorNames[index]) ||
                  //     slide.color?.[slide.color.length - 1] ||
                  //     "#444444";
                  const selectedColor = getSelectedColor(slide, index);

                  // 컬러 순서 바꾸기
                  const sortedColors = Array.isArray(slide.color)
                    ? [...slide.color].sort(() => Math.random() - 0.5) // 간단 버전
                    : [];

                  return (
                    <div
                      key={index}
                      className={`circle_item ${
                        Math.abs(position) <= 1 ? "active" : ""
                      } ${isCenter ? "center" : ""}`}
                      style={{
                        opacity: opacity,
                        pointerEvents: opacity === 0 ? "none" : "auto",
                        position: "absolute",
                        left: `${55 + position * 45}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="item">
                        <div
                          className="goods_wrap"
                          style={{ color: slide.color }}
                        >
                          <div className="goods_pic crocs">
                            <a href={slide.link}>
                              <img
                                src={slide.product_img[0].replace(
                                  "images/",
                                  "../images/"
                                )}
                                alt={slide.product}
                              />
                            </a>
                          </div>
                          <div className="goods_txt">
                            <span>{slide.cate}</span>
                            <strong>
                              {slide.product}
                              <br />
                            </strong>
                            {/* 컬러설정 */}
                            <div className="s_color">
                              {/* 신발컬러 선택 */}
                              <div className="swatches">
                                <ul className="swatches_list">
                                  {Array.isArray(slide.color) &&
                                    slide.color.map((color, i) => (
                                      <li
                                        key={i}
                                        className={`swatch_color ${
                                          selectedColor === color
                                            ? "active"
                                            : ""
                                        }`}
                                        style={{
                                          background: color,
                                        }}
                                        onClick={() =>
                                          changeColor(index, color)
                                        }
                                      ></li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <Link
                              to={`/product/${slide.id}`}
                              className="btn middle arrow"
                              style={{
                                "--selectedColor": selectedColor || "#444444",
                              }}
                              onClick={() => onOpenProductMore(slide.id)}
                            >
                              <span className="btn-read">READ MORE</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* Navigation */}
                      {isCenter && (
                        <div className="slide_btns">
                          <button onClick={prevSlide} className="prev_btn">
                            <p>Prev</p>
                          </button>
                          <button onClick={nextSlide} className="next_btn">
                            <p>Next</p>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dots */}
              {showDot && (
                <div className="circle_dots">
                  {visibleDots.map((_, i) => {
                    const realIndex = startIndex + i; // 실제 인덱스

                    return (
                      <button
                        key={realIndex}
                        onClick={() => goToSlide(realIndex)}
                        className={`circle_dot ${
                          currentSlide === realIndex ? "active" : ""
                        }`}
                      >
                        <span></span>
                        {currentSlide === realIndex && (
                          <div
                            className={`circular ${
                              currentSlide === realIndex ? "active" : ""
                            }`}
                          >
                            <div className="inner"></div>
                            <div className="circle">
                              <div className="bar left">
                                <div className="progress"></div>
                              </div>
                              <div className="bar right">
                                <div className="progress"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className={`goods_btn start ${isPlaying ? "" : "stop"}`}
                style={{ transform: `translateY(${items.length * 25}px)` }}
              >
                <span className="bnt_bg"></span>
                <span className="blind">정지 시작 버튼</span>
              </button>

              {/* Scroll Indicator */}
              <div className="goods_scroll">
                <Link to="#page">
                  <span className="blind">이동</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideCircle;
