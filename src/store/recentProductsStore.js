import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRecentProductsStore = create(
  persist(
    (set, get) => ({
      // 상태
      recentProducts: [],

      // 상품 추가 (최근 본 상품에 추가)
      addRecent: (product) =>
        set((state) => {
          // 이미 존재하는 상품이면 제거 후 맨 앞에 추가
          const filtered = state.recentProducts.filter(
            (p) => p.id !== product.id
          );
          const newProduct = {
            ...product,
            viewedAt: new Date().toISOString(),
          };
          // 최대 20개까지만 저장
          return {
            recentProducts: [newProduct, ...filtered].slice(0, 20),
          };
        }),

      // 상품 삭제
      removeProduct: (productId) => {
        set((state) => ({
          recentProducts: state.recentProducts.filter(
            (p) => p.id !== productId
          ),
        }));
      },

      // 전체 삭제
      clearAll: () => {
        set({ recentProducts: [] });
      },

      // 특정 상품 조회 시간 업데이트
      updateViewedTime: (productId) => {
        set((state) => ({
          recentProducts: state.recentProducts.map((p) =>
            p.id === productId
              ? { ...p, viewedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      // 오래된 상품 자동 삭제 (30일 이상)
      removeOldProducts: () => {
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        set((state) => ({
          recentProducts: state.recentProducts.filter(
            (p) => new Date(p.viewedAt).getTime() > thirtyDaysAgo
          ),
        }));
      },

      // 최근 본 상품 개수 조회
      getProductCount: () => {
        return get().recentProducts.length;
      },
    }),
    {
      name: "recent-products-storage",
      version: 1,
    }
  )
);
