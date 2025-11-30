import React from 'react';
import GnbLeft from './GnbLeft';
import GnbRight from './GnbRight';

const GnbWrap = ({ onSearchClick }) => {
    return (
        <div className="gnb_wrap">
            <GnbLeft />
            <GnbRight onSearchClick={onSearchClick} />
        </div>
    );
};

export default GnbWrap;
