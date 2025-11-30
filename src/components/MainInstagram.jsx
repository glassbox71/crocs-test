import React, { useRef, useState } from 'react';
import './scss/MainInstagram.scss';
// import '../index.css';
import Title from './Title';
// import InstagramPrevButton from './components/InstagramPrevButton';
import InstagramVideoList from './InstagramVideoList';
import instagramData from '../data/instagramData.json';

const MainInstagram = () => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const videoRef3 = useRef(null);

    const videoRefs = [videoRef1, videoRef2, videoRef3];

    const [playStates, setPlayStates] = useState([false, false, false]);

    // 비디오 재생/정지 핸들러
    const handlePlayClick = (index) => {
        const video = videoRefs[index].current;
        const newPlayStates = [...playStates];

        if (video.paused) {
            video.play();
            newPlayStates[index] = true;
        } else {
            video.pause();
            newPlayStates[index] = false;
        }

        setPlayStates(newPlayStates);
    };

    return (
        <main>
            <section className="instagram">
                <div className="instagram__content">
                    <Title
                        title="Your Crocs. Your Splash."
                        subTitle="스타들의 일상 속, 크록스를 만나보세요."
                    />

                    <InstagramVideoList
                        videos={instagramData}
                        videoRefs={videoRefs}
                        playStates={playStates}
                        onPlayClick={handlePlayClick}
                    />
                </div>
            </section>
        </main>
    );
};

export default MainInstagram;
