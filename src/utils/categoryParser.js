import { getCategoryMap } from './getCategoryMap';

export const parseCategoryTags = (item) => {
    const map = getCategoryMap();

    // cate: "신상품, 클로그, 퍼즈"
    const cateList =
        item.cate
            ?.split(',')
            .map((v) => v.trim())
            .filter(Boolean) || [];

    // subcategory: "클로그, 퍼즈"
    const subList =
        item.subcategory
            ?.split(',')
            .map((v) => v.trim())
            .filter(Boolean) || [];

    // 전체 한국어 태그
    const koreanTags = [...cateList, ...subList];

    // 영어 태그 변환
    const englishTags = [
        ...new Set(
            koreanTags
                .map((tag) => {
                    if (tag.includes('_')) {
                        return tag.split('_').map((p) => map[p] || p);
                    }
                    return map[tag] || tag;
                })
                .flat()
                .filter(Boolean)
        ),
    ];

    return {
        tags: englishTags,
        tags_ko: koreanTags,
    };
};
