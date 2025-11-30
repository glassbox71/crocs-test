import React from 'react';
import { Link } from 'react-router-dom';

const InstagramPrevButton = ({ onClick }) => {
    return (
        <div className="instagram__video-prev">
            <Link className="instagram__video-prev-link" onClick={onClick}>
                <span className="prev_line"></span>
                <span className="prev_line"></span>
                <p className="prev_text">prev</p>
            </Link>
        </div>
    );
};

export default InstagramPrevButton;
