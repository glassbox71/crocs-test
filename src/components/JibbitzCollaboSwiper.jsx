import React, { useEffect } from "react";
import { collaboAuthStore } from "../store/collaboAuthStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import JibbitzProductCard from "./JibbitzProductCard";
import "swiper/css";
import "./scss/jibbitzcollaboswiper.scss";
import Title from "./Title";

const JibbitzCollaboSwiper = () => {
  const { disneyItems, onFetchJibbitz } = collaboAuthStore();

  // 상품 불러오기useEffect
  useEffect(() => {
    onFetchJibbitz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="jibbitz_wrap">
      <div className="inner">
        <Title
          title={`COLLABO <br/> Jibbitz`}
          subTitle="당신의 스타일에 맞는 완벽한 크록스를 찾아보세요"
        />

        <div className="collabo-wrap">
          <Swiper
            modules={[Navigation, Scrollbar]}
            // pagination
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            scrollbar
            grabCursor={true}
            spaceBetween={50}
            slidesPerView={2.5}
            centeredSlides={true}
            loop={true}
            speed={700}
            className="MySwiper"
          >
            {disneyItems.map((item) => (
              <SwiperSlide key={item.id}>
                <JibbitzProductCard sendItem={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-btn-wrap">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JibbitzCollaboSwiper;
