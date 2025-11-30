import React, { useEffect, useState } from 'react';
import '../components/scss/ProductDetail.scss';
import { collaboAuthStore } from '../store/collaboAuthStore';
import { useParams } from 'react-router-dom';
import JibbitzProductImage from '../components/JibbitzProductImage';
import JibbitzProductInfo from '../components/JibbitzProductInfo';

const JibbitzProductDetail = () => {
    const { id } = useParams();
    const { jibbitzItems } = collaboAuthStore();

    //찾은 상품을 저장할 변수
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id || jibbitzItems.length === 0) return;
        //선택된 제품 찾기
        const findItem = jibbitzItems.find((item) => String(item.id) === String(id));
        setProduct(findItem);
    }, [id, jibbitzItems]);

    if (!product) {
        return <div>상품 정보를 불러오고 있으니 기다리</div>;
    }
    return (
        <main className="product-detail-page">
            <div className="product-img-info__wrap">
                <JibbitzProductImage product={product} />
                <JibbitzProductInfo product={product} />
            </div>
        </main>
    );
};

export default JibbitzProductDetail;
