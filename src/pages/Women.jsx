import React from 'react';
import LeftNavigation from '../components/LeftNavigation';
import ProductList from '../components/ProductList';
import './scss/Women.scss';

const Women = () => {
    const products = [
        {
            id: 1,
            name: '클래식 언퍼게터블 스웨이드\n클로그',
            images: [
                {
                    src: '/images/Sub_Women_Images/1_클래식_언퍼게터블_스웨이드_클로그_1.jpg',
                    alt: '클래식 언퍼게터블 스웨이드 클로그 이미지 1',
                },
                {
                    src: '/images/Sub_Women_Images/1_클래식_언퍼게터블_스웨이드_클로그_2.jpg',
                    alt: '클래식 언퍼게터블 스웨이드 클로그 이미지 2',
                },
            ],
            price: { discountedPrice: 55900, discountRate: 20, originalPrice: 69900 },
            colors: ['black', 'brown', 'navy', 'pink'],
            sizes: [
                '210',
                '220',
                '230',
                '240',
                '250',
                '260',
                '265',
                '270',
                '280',
                '290',
                '300',
                '310',
            ],
            soldOutSizes: [],
        },
    ];

    const sizes = [
        '210',
        '220',
        '230',
        '240',
        '250',
        '260',
        '265',
        '270',
        '280',
        '290',
        '300',
        '310',
    ];
    const filters = [
        { color: 'pink', class: 'select-pink' },
        { color: 'black', class: 'select-black' },
    ];

    return (
        <main>
            <div className="section__wrap">
                <LeftNavigation
                    category="여성"
                    subcategory="털안감 라인드 클로그"
                    sizes={sizes}
                    filters={filters}
                />
                <ProductList products={products} />
            </div>
        </main>
    );
};

export default Women;
