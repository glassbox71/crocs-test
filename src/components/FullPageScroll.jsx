// import React, { useEffect, useState, useRef } from "react";
// import "./scss/FullPageScroll.scss";

// const FullPageScroll = ({ children, onSectionChange }) => {
//   const containerRef = useRef(null);
//   const [sections, setSections] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentIndexRef = useRef(0);
//   const isScrolling = useRef(false);

//   // 섹션 수집 (처음 한 번만)
//   useEffect(() => {
//     if (!containerRef.current) return;

//     const sec = Array.from(containerRef.current.children).filter(
//       (el) =>
//         el.tagName.toLowerCase() === "section" ||
//         el.tagName.toLowerCase() === "footer"
//     );
//     setSections(sec);
//   }, []); //  children 의존 X

//   // state ↔ ref 동기화
//   useEffect(() => {
//     currentIndexRef.current = currentIndex;
//   }, [currentIndex]);

//   // 스크롤 이동 함수
//   const scrollToSection = (index) => {
//     if (!sections[index]) return;

//     isScrolling.current = true;

//     sections[index].scrollIntoView({
//       behavior: "smooth",
//     });

//     setTimeout(() => {
//       isScrolling.current = false;
//     }, 400);
//   };

//   // currentIndex 바뀔 때 실제 스크롤 + 부모에게 알림
//   useEffect(() => {
//     if (sections.length === 0) return;

//     scrollToSection(currentIndex);

//     if (onSectionChange) {
//       onSectionChange(currentIndex, sections[currentIndex]);
//     }
//   }, [currentIndex, sections, onSectionChange,scrollToSection]);

//   // 마우스 휠 (한 번만 등록)
//   useEffect(() => {
//     if (sections.length === 0) return;

//     const handleWheel = (e) => {
//       if (isScrolling.current) return;
//       e.preventDefault();

//       const idx = currentIndexRef.current;

//       if (e.deltaY > 0) {
//         // 아래로
//         if (idx < sections.length - 1) {
//           const next = idx + 1;
//           currentIndexRef.current = next;
//           setCurrentIndex(next);
//         }
//       } else if (e.deltaY < 0) {
//         // 위로
//         if (idx > 0) {
//           const next = idx - 1;
//           currentIndexRef.current = next;
//           setCurrentIndex(next);
//         }
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     return () => window.removeEventListener("wheel", handleWheel);
//   }, [sections.length]); //  currentIndex 의존 X

//   // 터치 스크롤 (모바일)
//   useEffect(() => {
//     if (sections.length === 0) return;

//     let startY = 0;

//     const handleTouchStart = (e) => {
//       startY = e.touches[0].clientY;
//     };

//     const handleTouchEnd = (e) => {
//       if (isScrolling.current) return;

//       const diff = startY - e.changedTouches[0].clientY;
//       if (Math.abs(diff) < 50) return;

//       const idx = currentIndexRef.current;

//       if (diff > 0 && idx < sections.length - 1) {
//         const next = idx + 1;
//         currentIndexRef.current = next;
//         setCurrentIndex(next);
//       } else if (diff < 0 && idx > 0) {
//         const next = idx - 1;
//         currentIndexRef.current = next;
//         setCurrentIndex(next);
//       }
//     };

//     window.addEventListener("touchstart", handleTouchStart, { passive: true });
//     window.addEventListener("touchend", handleTouchEnd, { passive: true });

//     return () => {
//       window.removeEventListener("touchstart", handleTouchStart);
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [sections.length]); //  currentIndex 의존 X

//   return (
//     <div className="fullpage-container" ref={containerRef}>
//       {children}
//     </div>
//   );
// };

// export default FullPageScroll;
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./scss/FullPageScroll.scss";

const FullPageScroll = ({ children, onSectionChange }) => {
  const containerRef = useRef(null);
  const [sections, setSections] = useState([]);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  // 섹션 수집 (children 변경 시마다)
  useEffect(() => {
    if (!containerRef.current) return;
    const sec = Array.from(containerRef.current.children).filter(
      (el) => ["section", "footer"].includes(el.tagName.toLowerCase())
    );
    setSections(sec);
  }, [children]);

  // currentIndex ↔ ref 동기화
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // 스크롤 이동 함수
  const scrollToSection = useCallback(
    (index) => {
      if (!sections[index]) return;

      isScrolling.current = true;
      sections[index].scrollIntoView({ behavior: "smooth" });

      // 스크롤 종료 감지 (간단히 500ms 후 해제)
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);

      if (onSectionChange) {
        onSectionChange(index, sections[index]);
      }
    },
    [sections, onSectionChange]
  );

  // currentIndex 변경 시 스크롤
  useEffect(() => {
    if (sections.length === 0) return;
    scrollToSection(currentIndex);
  }, [currentIndex, sections, scrollToSection]);

  // 공통 스크롤 핸들러
  const handleScroll = useCallback(
    (direction) => {
      if (isScrolling.current) return;
      const idx = currentIndexRef.current;
      let next = idx;

      if (direction === "down" && idx < sections.length - 1) next = idx + 1;
      if (direction === "up" && idx > 0) next = idx - 1;

      if (next !== idx) {
        currentIndexRef.current = next;
        setCurrentIndex(next);
      }
    },
    [sections.length]
  );

  // 마우스 휠 이벤트
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? "down" : "up");
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleScroll]);

  // 터치 이벤트 (모바일)
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      handleScroll(diff > 0 ? "down" : "up");
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleScroll]);

  return (
    <div className="fullpage-container" ref={containerRef}>
      {children}
    </div>
  );
};

export default FullPageScroll;

