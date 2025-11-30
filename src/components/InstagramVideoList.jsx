import React from 'react';
import InstagramVideoItem from './InstagramVideoItem';

const InstagramVideoList = ({ videos, videoRefs, playStates, onPlayClick }) => {
  return (
    <div className="instagram__video-list">
      {videos.map((video, index) => (
        <InstagramVideoItem
          key={video.id}
          video={video}
          videoRef={videoRefs[index]}
          isPlaying={playStates[index]}
          onPlayClick={() => onPlayClick(index)}
        />
      ))}
    </div>
  );
};

export default InstagramVideoList;
