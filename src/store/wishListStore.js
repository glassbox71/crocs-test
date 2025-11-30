import { create } from "zustand";
import { persist } from "zustand/middleware";

export const wishListStore = create(
    persist(
        (set, get) => ({
            // ========= 위시리스트 담기 =========

            // 위시목록에 저장할 배열
            wishLists: [],
            // 위시 저장 완료 팝업
            popUp: {
                show: false,
                message: "",
            },

            // 위시리스트 저장 메서드
            onAddWishList: (product) => {
                console.log("선택상품 들어왔나?:", product);
                const wish = get().wishLists;
                const existing = wish.find((item) => item.id === product.id);
                if (existing) {
                    set({ popUp: { show: true, message: "이미 위시리스트에 담긴 상품입니다 💚" } });
                    return false;
                }
                set({
                    wishLists: [...wish, product],
                    popUp: { show: true, message: "위시리스트에 추가되었습니다! 💚" },
                });
                console.log("wishLists에 담긴 것 확인:", get().wishLists);
                return true;
            },

            // 위시 추가 팝업창 끄기
            hidePopup: () => set({ popUp: { show: false, message: "" } }),

            // ======== 위시리스트 데이터 삭제 ========

            // 위시리스트 중 선택된 내역을 저장할 배열
            removeWish: [],

            // 체크박스 체크했을 때 담기
            toggleRemoveWish: (item) => {
                const currentWish = get().removeWish;
                const findSelectWish = currentWish.find((w) => w.id === item.id);

                if (findSelectWish) {
                    //이미 있으면 제거
                    set({ removeWish: currentWish.filter((w) => w.id !== item.id) });
                } else {
                    //없으면 추가
                    const newRemoveWish = [...currentWish, item];
                    set({ removeWish: newRemoveWish });
                    console.log("newRemoveWish체크박스 체크했을 때:", newRemoveWish);
                }
            },

            onRemoveWish: () => {
                console.log("위시삭제");
                const removeWish = get().removeWish;
                console.log("removeWish 선택된 위시:", removeWish);
                const wishLists = get().wishLists;
                console.log("wishLists 전체위시:", wishLists);

                const updateWishLists = wishLists.filter(
                    (wish) => !removeWish.some((r) => r.id === wish.id)
                );

                set({ wishLists: updateWishLists, removeWish: [] });
            },

            addCartWish: [],
            cartWishItems: [],
            cartCount: 0,

            //장바구니 추가 버튼 선택 시 위시리스트에서 지우고 장바구니 배열에 추가
            onAddCartBtn: () => {
                // 체크된 위시들을 배열로 가져옴
                const removeWish = get().removeWish;
                // 전체 위시리스트
                const wishLists = get().wishLists;
                // 현재 장바구니 목록
                const cartWishItems = get().cartWishItems;

                console.log("장바구니 추가 버튼:", { removeWish, wishLists, cartWishItems });

                // 위시리스트에서 선택된 항목 제거
                const newWishLists = wishLists.filter(
                    (wish) => !removeWish.some((r) => r.id === wish.id)
                );

                // 장바구니에 선택된 항목 추가
                const newcartWishItems = [...cartWishItems];

                removeWish.forEach((item) => {
                    const existing = newcartWishItems.find((cart) => cart.id === item.id);

                    if (existing) {
                        existing.count = (existing.count || 1) + (item.count || 1);
                    } else {
                        newcartWishItems.push({ ...item, count: item.count || 1 });
                    }
                });

                console.log("새로운 cartWishItems:", newcartWishItems);

                // 상태 업데이트
                set({
                    wishLists: newWishLists,
                    cartWishItems: newcartWishItems,
                    cartCount: newcartWishItems.length,
                    removeWish: [], // 체크 초기화
                    popUp: { show: true, message: "장바구니에 추가되었습니다! 🛒" },
                });
            },

            // cartItems - 상품 상세에서 직접 장바구니 담기용
            cartItems: [],

            // 상품 상세에서 장바구니 담기 메서드
            onProductAddCart: (product, count = 1) => {
                console.log("onProductAddCart 호출:", { product, count });

                const cartItems = get().cartItems;
                const existing = cartItems.find((item) => item.id === product.id);

                let updated;
                if (existing) {
                    // 이미 있으면 수량 증가
                    updated = cartItems.map((item) =>
                        item.id === product.id ? { ...item, count: item.count + count } : item
                    );
                    console.log("기존 상품 수량 증가");
                } else {
                    // 새로운 상품 추가
                    updated = [...cartItems, { ...product, count }];
                    console.log("새 상품 추가");
                }

                console.log("업데이트된 cartItems:", updated);

                set({
                    cartItems: updated,
                    cartCount: updated.reduce((sum, item) => sum + item.count, 0),
                    popUp: { show: true, message: "장바구니에 담겼습니다!" },
                });

                return true;
            },
        }),
        {
            name: "wishlist-storage",
            partialize: (state) => ({
                wishLists: state.wishLists,
                cartWishItems: state.cartWishItems,
                cartItems: state.cartItems,
                cartCount: state.cartCount,
            }),
        }
    )
);
