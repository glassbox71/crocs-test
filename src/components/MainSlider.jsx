import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './scss/mainSlider.scss';

const MainSlider = () => {
    const swiperRef = useRef(null);
    const slides = [
        { id: 1, src: './video/main_slide_01.mp4', tag: 'video', title: "Rei's Bay Clog" },
        {
            id: 2,
            src: '/images/main_slide_02.jpg',
            alt: 'slide2',
            tag: 'img',
            title: 'Crocs x Vogue',
        },
        {
            id: 3,
            src: './video/main_slide_03.mp4',
            tag: 'video',
            title: 'Cassic Platform Clog x Rei',
        },
        {
            id: 4,
            src: '/images/main_slide_04.jpg',
            alt: 'slide4',
            tag: 'img',
            title: 'Crocs x ABC MART with SEULGI',
        },
        { id: 5, src: './video/main_slide_05.mp4', tag: 'video', title: 'Echo Wave x TAEMIN' },
    ];

    const pagination = {
        clickable: true,
        renderBullet: (index, className) =>
            `<span class="${className}">${slides[index].title}</span>`,
    };

    const handleInit = (swiper) => {
        swiperRef.current = swiper;
        handleSlideChange(swiper);
    };

    const handleSlideChange = (swiper) => {
        const videos = document.querySelectorAll('.main_slide_video');

        // 모든 비디오 정지
        videos.forEach((v) => {
            v.pause();
            v.currentTime = 0;
            v.onended = null;
        });

        const activeSlide = swiper.slides[swiper.activeIndex];
        const video = activeSlide.querySelector('.main_slide_video');

        if (video) {
            // 비디오 재생 모드
            if (swiper.autoplay && swiper.autoplay.stop) swiper.autoplay.stop();

            setTimeout(() => {
                video.play().catch((err) => console.warn('Video play blocked:', err));

                video.onended = () => {
                    swiper.slideNext();

                    // autoplay가 살아있을 때만 실행
                    if (swiper.autoplay && swiper.autoplay.start) {
                        swiper.autoplay.start();
                    }
                };
            }, 400);
        } else {
            // 이미지일 경우 autoplay 유지
            if (swiper.autoplay && swiper.autoplay.start) {
                swiper.autoplay.start();
            }
        }
    };

    return (
        <div className="main_slider_wrap">
            <div className="main_slider">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={pagination}
                    loop
                    onInit={handleInit}
                    onSlideChange={handleSlideChange}
                    className="main_slider"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {slide.tag === 'video' ? (
                                <video
                                    src={slide.src}
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="main_slide_video"
                                />
                            ) : (
                                <img
                                    src={slide.src}
                                    alt={slide.alt || `slide-${slide.id}`}
                                    className="main_slide_image"
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MainSlider;
