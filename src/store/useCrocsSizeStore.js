import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sizes } from '../data/CrocsSizeData';

export const useCrocsSizeStore = create(
    persist(
        (set) => ({
            crocsSizes: [],
            crocsSizesByCategory: {},

            onFetchSize: () => {
                // 전체 사이즈
                const allSizes = Array.from(
                    new Set(Sizes.flatMap((sizeObj) => sizeObj.sizes))
                ).sort((a, b) => a - b);

                // 카테고리별 사이즈
                const allSizesByCategory = Sizes.reduce((acc, cur) => {
                    acc[cur.id] = [...new Set(cur.sizes)].sort((a, b) => a - b);
                    return acc;
                }, {});

                set({
                    crocsSizes: allSizes,
                    crocsSizesByCategory: allSizesByCategory,
                });
            },
        }),
        {
            name: 'crocs-size-storage',
        }
    )
);
