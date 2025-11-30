import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainmenuList from "./MainmenuList";
import GnbWrap from "./GnbWrap";
import Depth1 from "./Depth1";
import Search from "./Search";
import { useCrocsProductStore } from "../store/useCrocsProductStore";
import { useLocation } from "react-router-dom";
import "./scss/header.scss";

const Header = ({ onCartClick, onRecentClick }) => {
  const searchOpen = useCrocsProductStore((state) => state.searchOpen);
  const onOpenSearch = useCrocsProductStore((state) => state.onOpenSearch);
  const onCloseSearch = useCrocsProductStore((state) => state.onCloseSearch);
  const [depthOpen, setDepthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // <- 스크롤 상태
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [isRecentOpen, setIsRecentOpen] = useState(false);
  const location = useLocation();
  const isSubPage = location.pathname !== "/"; // 예: 메인 페이지가 '/'일 경우

  useEffect(() => {
    const handleScroll = () => {
      const slider = document.querySelector(".main_slider_wrap");
      const sliderHeight = slider?.offsetHeight || 1; // 0 방지
      if (window.scrollY > sliderHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 첫 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* header와 depth1을 감싸는 wrapper */}
      <div
        className={[
          "header_wrapper",
          isSubPage ? "subpage" : "",
          depthOpen ? "open" : "",
          searchOpen ? "hide" : "",
          scrolled ? "scrolled" : "",
        ].join(" ")}
      >
        <header className="header">
          <div className="wide_inner">
            <div className="header_left">
              <h1 className="logo">
                <Link to="/">
                  <img src="/images/crocs_logo.svg" alt="crocs logo" />
                </Link>
              </h1>
              <nav
                onMouseEnter={() => setDepthOpen(true)}
                onMouseLeave={() => setDepthOpen(false)}
              >
                <MainmenuList />
              </nav>
            </div>
            <div className="header_right">
              <GnbWrap onSearchClick={onOpenSearch} />
            </div>
          </div>
        </header>

        {depthOpen && <Depth1 setDepthOpen={setDepthOpen} />}
      </div>

      <div className="header_slide_buttons">
        <button className="cart-button" onClick={onCartClick}>
          <img src="/images/cart-slide-icon.svg" alt="카트팝업" />
        </button>
        <button className="recently-button" onClick={onRecentClick}>
          <img src="/images/recently-slide-icon.svg" alt="최근본상품팝업" />
        </button>
      </div>

      {/* {searchOpen && <Search onClose={onCloseSearch} />} */}
      {searchOpen && <Search onClose={onCloseSearch} scrolled={scrolled} />}
    </>
  );
};

export default Header;
