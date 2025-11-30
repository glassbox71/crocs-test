'use no memo';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collaboAuthStore } from '../store/collaboAuthStore';
import { wishListStore } from '../store/wishListStore';
import Title from '../components/Title';
import WishAddPopup from '../components/WishAddPopup';
import JibbitzCollaboProductDetailCard from '../components/JibbitzCollaboProductDetailCard';

const JibbitzCollaboProductDetail = () => {
    const { id } = useParams();
    const { disneyItems } = collaboAuthStore();
    const { onAddWishList } = wishListStore();

    //찾은 상품을 저장할 변수
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id || disneyItems.length === 0) return;
        //뿌려질 제품 찾기
        const findItem = disneyItems.find((item) => String(item.id) === String(id));
        setProduct(findItem);
    }, [id, disneyItems]);

    if (!product) {
        return <div>상품 정보를 불러오고 있으니 기다리</div>;
    }

    return (
        <div className="sub_page">
            <div className="inner">
                <Title title="ProductDeatil" />
                <div className="product-detail-wrap">
                    <p>상품 예시입니당 💚</p>
                    <button onClick={() => onAddWishList(product)}>위시버튼💚</button>
                    <WishAddPopup />
                    <JibbitzCollaboProductDetailCard product={product} />
                </div>
            </div>
        </div>
    );
};
export default JibbitzCollaboProductDetail;
