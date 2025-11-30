// import React from 'react';
// import { Link } from 'react-router-dom';

const FooterBottom = ({ onOpenCS }) => {
    return (
        <>
            <div className="footer_bottom">
                <div className="wide_inner">
                    <button onClick={onOpenCS}>CS Center</button>
                    <button>
                        <span>INFO</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FooterBottom;
