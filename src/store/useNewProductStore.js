import React from 'react';
import { create } from 'zustand';
import { Products } from '../data/CrocsProductsData.js';
// import { newProducts } from "../data/newProductData.js";

export const useNewProductStore = create((set, get) => ({
    items: [],
    onFetchItem: async () => {
        const currentItems = get().items;
        if (currentItems.length > 0) return;

        // 신상품, 출시 예정 상품 데이터만 필터링
        const filteredProuducts = Products.filter((product) => {
            if (!product.cate) return false;
            // cate 속성비교
            const cateLower = product.cate.toLowerCase();
            return cateLower.includes('신상품') || cateLower.includes('출시 예정');
        });
        // console.log(`전체상품: ${Prouducts.length}, 신상품 출시예정 상품: ${filteredProuducts.length}`);

        set({ items: filteredProuducts });
    },
}));

// export const useNewProductStore = create((set) => ({
//     items: newProducts,
// }));
