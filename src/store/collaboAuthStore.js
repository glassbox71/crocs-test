import { create } from 'zustand';
import { jibbitzs } from '../data/jibbitzs';

export const collaboAuthStore = create((set, get) => ({
    jibbitzItems: [],
    selectFilterLists: [],

    onFetchJibbitz: async () => {
        const items = get().jibbitzItems;
        if (items.length > 0) return;
        set({ jibbitzItems: jibbitzs });

        // "세트" 포함이면 "팩", 아니면 "싱글" 추가한 새 배열 생성
        const filter = jibbitzs.map((item) => ({
            ...item,
            filter: item.title.includes('세트') ? '팩' : '싱글',
        }));

        // 새 배열도 store에 저장
        set({ selectFilterLists: filter });
    },

    disneyItems: jibbitzs.filter(
        (item) =>
            item.title.includes('디즈니') ||
            item.title.includes('동물') ||
            item.title.includes('미키') ||
            (item.title.includes('산리오') && item.price !== '')
    ),

    jibbitzFilterList: ['전체', '싱글', '팩', '콜라보'],

    selectFilter: '',
    filteredList: [],

    onFilterBtn: async (value) => {
        console.log('선택한 필터:', value);
        set((state) => {
            const filtered = state.selectFilterLists.filter((item) => item.filter === value);
            return {
                selectFilter: value,
                filteredList: filtered,
            };
        });
    },
}));