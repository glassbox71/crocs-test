import { create } from 'zustand';
import jibbitzAll from '../data/jibbitzAll.json';

export const collaboAuthStore = create((set, get) => ({
    //메인//
    //section3_CollaboJibbitz 상품 목록을 저장할 배열
    jibbitzItems: jibbitzAll,
    disneyItems: jibbitzAll.filter(
        (item) =>
            (item.title.includes('디즈니') || item.title.includes('동물')) && item.price !== ''
    ),
}));
