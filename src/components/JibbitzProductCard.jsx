import React from 'react';
import { useNavigate } from 'react-router-dom';

const JibbitzProductCard = ({ sendItem }) => {
    const navigate = useNavigate();

    const onOpenProductDetail = () => {
        navigate(`/jibbitz/${sendItem.id}`);
    };

    return (
        <div className="product_card" onClick={() => onOpenProductDetail()}>
            <div className="img-box">
                <img src={sendItem.imageUrl} alt={sendItem.title} className="imgSize" />
            </div>
            <div className="text-box">
                <div className="text-title">
                    <p>{sendItem.title}</p>
                    <p>5 Pack Jibbitz</p>
                </div>
                <div className="text-price">
                    <p>{sendItem.price}</p>
                </div>
            </div>
            <div className="text-badge">
                <span>Collabs</span>
                <span>ZIBBITZ</span>
            </div>
        </div>
    );
};

export default JibbitzProductCard;
