// utils/filterProductsByCategory.js
import { getCategoryMap } from './getCategoryMap';

// selectedKey → menuList 의 key (예: "clog", "women", "kids")
export function filterProductsByCategory(products, selectedKey) {
    const categoryMap = getCategoryMap();
    // 예: { "클로그": "clog", "퍼즈": "fuzz", "여성": "women" }

    return products.filter((p) => {
        const fullText = `${p.cate || ''}, ${p.subcategory || ''}`;

        // "신상품, 클로그, 퍼즈" → ["신상품", "클로그", "퍼즈"]
        const words = fullText
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

        // 한글 → key(영문) 변환
        const convertedKeys = words.map((w) => categoryMap[w]).filter(Boolean);

        // menu 클릭 시 selectedKey에 해당하는 key 포함 여부 체크
        return convertedKeys.includes(selectedKey);
    });
}
