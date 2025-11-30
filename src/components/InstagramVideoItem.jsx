import React from 'react';

const InstagramVideoItem = ({ video, videoRef, isPlaying, onPlayClick }) => {
    return (
        <div className="instagram__video-item">
            <video ref={videoRef} className="instagram__video" muted loop>
                <source src={video.src} type="video/mp4" />
            </video>
            <img
                src="/images/icon_insta_play_2.png"
                alt="play_icon"
                className="instagram__play-icon"
                style={{
                    opacity: isPlaying ? '0.5' : '1',
                    filter: isPlaying ? 'brightness(0.7)' : 'brightness(1)',
                }}
                onClick={onPlayClick}
            />
            <div className="instagram__button-wrap">
                <button className="instagram__button">
                    @&nbsp;<span>{video.username}</span>
                </button>
            </div>
        </div>
    );
};

export default InstagramVideoItem;
