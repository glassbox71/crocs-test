import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Products } from "../data/CrocsProductsData.js";

export const useProductStore = create(
  persist(
    (set, get) => ({
      // 삼품목록을 저장할 배열 // 새로고침하면 빈칸이 될수잇음
      items: [],

      //검색어를 저장할 변수
      searchWord: "",
      // 2. 메서드
      // 검색어를 변경할 메서드
      setSearchWord: (word) => set({ searchWord: word }),
      clearSearch: () => set({ searchWord: "" }),

      // ==== 외부 데이터를 불러서 ====
      onFetchItems: async () => {
        // 저장을 하기전에 items데이터를 부르면 에러발생
        // 그래서 배열에 데이터가 들어 있는지를 체크하여 있으면 배열 데이터를 그냥 사용
        const existing = get().items;
        if (existing.length > 0) return;

        // 상품 불러오기
        const res = {
          json: async () => Products,
        };

        const data = await res.json();
        console.log(data);

        set({ items: data });
        set({ items: Products });
      },

      // 불러진 데이터를 카테고리별로 분리하기 - filter
      onItemsCategory: (cate) => {
        const allItems = get().items;
        if (!cate || cate === "all") {
          return allItems;
        } else {
          return allItems.filter((item) => item.category === cate);
        }
        // if (!cate || cate === "all") return allItems;
        // return allItems.filter((item) => item.category === cate);
      },

      // 카트에 담은 상품을 저장할 배열
      cartItems: [],
      // 카트에 담긴 삼풍이 개수
      cartCount: 0,
      // 총금액
      totalPrice: 0,
      // 장바구니

      // 장바구니추가
      onAddToCart: (product) => {
        let updateCart;
        // 사이즈 같은 요소를 다시 담기를 했으면 이미 장바구니에 있는 제품이므로 개수만 증가
        // 사이즈 다른 요소를 담기로 새로 담기
        set((state) => {
          const existing = state.cartItems.find(
            (item) => item.id === product.id && item.color === product.color
          );
          if (existing) {
            // 다른 제품은 그냥 담고, 같은 제품은 개수를 변경
            // set을 생략하면 state. 사용
            updateCart = state.cartItems.map((item) =>
              item.id === product.id && item.color === product.color
                ? // 기존의 있는 아이템복사, 카운트 속성은 기존카운트값+새로운카운트값
                  { ...item, count: item.count + product.count }
                : item
            );
          } else {
            updateCart = [
              ...state.cartItems,
              { ...product, count: product.count || 1 },
            ];
          }
          return { cartItems: updateCart, cartCount: updateCart.length };
          // get으로 가져온값이 아니라 리턴에 바로 넣어주고 set 안씀
          // set({ cartItems: product });
          // set({ cartCount: cartItems.length });
        });

        // 다른 방식으로
        // 카트안에 다 넣어주기
        console.log(product);
        const cart = get().cartItems;
        // 새로 추가된 상품이 기존 카트에 있는 제품인지 체크하기

        // 배열조작 3가지 map, filter(조건에 맞는 요소를 찾아서 새로운 배열만들기), find
        // find :조건에 맞는 요소가 있으면 true, 없으면 false
        const existing = cart.find(
          (item) => item.id === product.id && item.color === product.color
          // 조건에 만족하면 existing에 true값, 만족하지않으면 false값이 들어감
        );
        let updateCart2;
        // 기존 카트에 있는 제품이면 수량만 변경되도록
        // 같은 제품이 아닌 경우만 카트에 담기
        if (existing) {
          updateCart2 = cart.map(
            (item) =>
              item.id === product.id && item.color === product.color
                ? { ...item, count: item.count + product.count }
                : item
            // 아이템의 id가 product의 id가 같고 && 아이템의 color와 product의 color가 같으면?
            // 기존의 아이템이랑 카운트값 (아이템카운트+product카운트값을 더한값)을 넣어주기 - 수량만 증가
            // 같지않으면 그냥 아이템만 담기
          );
        } else {
          // 기존에 있는 카트 + 기존에있는 제품 (그냥 product를 가져오면 object자체가 들어감)
          updateCart2 = [...cart, { ...product }];
        }

        // 총구매금액
        let total = 0;
        // 총금액 구하기
        updateCart2.forEach((item) => {
          total += item.price * item.count;
        });

        set({
          cartItems: updateCart2,
          // 업데이트카트의 길이로 체크해서 카트안에 갯수세기
          cartCount: updateCart2.length,
          // 위에 선언해둔 전역변수 totalPrice에 total값을 넣어주기
          totalPrice: total,
        });
      },

      // 장바구니 제품 삭제
      // 같은 id값이 잇는 지 비교한후에 있으면 제거를 하고 남은 item을 다시 넣어주기
      onRemoveCart: (id, color) => {
        console.log(id, color);
        // get, set 방식
        const cart = get().cartItems;
        const updateCart = cart.filter(
          (ca) => !(ca.id === id && ca.color === color)
        );

        // 총금액 계산
        let total = 0;
        updateCart.forEach((item) => {
          total += item.price * item.count;
        });

        set({
          // 카트아이템을 업데이트카트로 바꿔주기
          cartItems: updateCart,
          cartCount: updateCart.length,
          totalPrice: total,
        });
      },

      // 장바구니의 +
      onPlusCount: (id, color) => {
        console.log("증가");
        // 같은 상품만 카운트 증가 - 필요한 조건에 맞는 얘만.
        const cart = get().cartItems;
        const updateCart = cart.map((item) =>
          item.id === id && item.color === color
            ? { ...item, count: item.count + 1 }
            : item
        );

        // 총금액 계산
        let total = 0;
        updateCart.forEach((item) => {
          total += item.price * item.count;
        });
        // 옷 상의 id==2 2+
        // 옷 상의 id==4 2
        set({
          // 값넣기
          cartItems: updateCart,
          totalPrice: total,
        });
      },

      // 장바구니의 -
      onMinusCount: (id, color) => {
        console.log("감소");

        const cart = get().cartItems;
        const updateCart = cart.map((item) =>
          item.id === id && item.color === color
            ? { ...item, count: Math.max(1, item.count - 1) }
            : item
        );

        const total = updateCart.reduce(
          (acc, item) => acc + item.price * item.count,
          0
        );

        set({
          cartItems: updateCart,
          totalPrice: total,
        });
      },

      // 장바구니 완전 비우기
      onClearCart: () =>
        set({
          cartItems: [],
          totalPrice: 0,
          cartCount: 0,
        }),

      // 찜하기
      // 찜목록을 저장할 배열
      wishLists: [],
      // 찜목록에 데이터 추가
      onAddWishList: (product) => {
        console.log("찜");
        const wish = get().wishLists;
        // wishLists에 들어있는 제품중, 방금 찜을 한 제품이 들어있는지 체크하기
        // maps 데이터에 변형을 줘서 다시 배열로 만듬
        // filter 조건에 맞으면 배열[]
        // finf true/false
        const existing = wish.find((wish) => wish.id === product.id);
        let updateWish;
        // 같은 제품이 있으면 아무것도 안하고, "이미 있는 제품입니다"
        // 없으면 새롭게 추가하기
        if (existing) {
          alert("이미 있는 제품입니다");
          return false; //  여기서 끝내야 set 실행 안됨
        } else {
          updateWish = [...wish, { ...product }];
        }

        // 데이터비교하고 넣어주기
        set({
          wishLists: updateWish,
        });
        return true;
        console.log(updateWish);
      },
      // 찜목록에서 데이터 제거
      onRemoveWish: (id) => {
        console.log("찜삭제");
        const wish = get().wishLists;
        const updateWish = wish.filter((wish) => wish.id !== id);

        set({
          wishLists: updateWish,
        });
      },

      // 주문항목을 저장할 변수
      orderList: [],

      // 쿠폰을 저장할 변수
      // coupons: [
      //     {
      //         id: 'welcome',
      //         text: '웰컴 쿠폰 5% 할인',
      //         type: 'percent',
      //         per: 5,
      //     },
      // ],

      // 사용자 쿠폰 목록을 가져오는 메서드 (loginAuthStore에서 가져옴)
      getUserCoupons: (user) => {
        if (!user || !user.coupons) return [];

        // 사용 가능한 쿠폰만 필터링 (사용하지 않았고, 만료되지 않은 쿠폰)
        return user.coupons.filter((coupon) => {
          if (coupon.isUsed) return false;

          if (coupon.expiresAt) {
            const expireDate = coupon.expiresAt.toDate
              ? coupon.expiresAt.toDate()
              : new Date(coupon.expiresAt);
            return expireDate >= new Date();
          }
          return true;
        });
      },

      //
      finalPrice: 0,

      // 선택된 쿠폰 체크
      selectedCoupon: null,
      // seletedCoupon에 매개값으로 넘어온 coupon값이 들어가도록
      onSelectCoupon: (coupon) => {
        set({ selectedCoupon: coupon });
        // 쿠폰 선택 시 바로 최종 금액 계산
        get().onFinalPrice();
      },

      // 쿠폰적용 최종 결제 금액
      onFinalPrice: () => {
        const { totalPrice, selectedCoupon } = get();
        let final = totalPrice;
        if (selectedCoupon) {
          if (selectedCoupon.type === "percentage") {
            // 퍼센트 할인
            final = Math.floor(
              totalPrice * (1 - selectedCoupon.discount / 100)
            );
          } else if (selectedCoupon.type === "fixed") {
            // 고정 금액 할인
            final = Math.max(0, totalPrice - selectedCoupon.discount);
          }
        }

        set({
          finalPrice: final, // finalPrice라는 변수에 넣기
        });
        return final;
      },

      // 주문하기
      onAddOrder: (usedCoupon = null) => {
        const { cartItems, orderList, selectedCoupon, finalPrice, totalPrice } =
          get();

        // 최종 금액 계산
        const orderPrice = finalPrice || totalPrice;

        const newOrder = {
          id: new Date().getTime().toString(), //<-숫자를 문자로 표시
          // 브라우저의 정보에 의해 언어에 맞게 문자열로 저장할떄 <-년월일순
          date: new Date().toLocaleString("ko-KR"),
          items: [...cartItems],
          originalPrice: totalPrice, // 원래 가격
          discountAmount: selectedCoupon ? totalPrice - orderPrice : 0, // 할인 금액
          finalPrice: orderPrice, // 최종 결제 금액
          // totalPrice: finalPrice, // onFinalPrice() 메서드는 호출, 변수는 그냥가져다쓰면됨
          usedCoupon: selectedCoupon
            ? {
                id: selectedCoupon.id,
                name: selectedCoupon.name,
                code: selectedCoupon.code,
                discount: selectedCoupon.discount,
                type: selectedCoupon.type,
              }
            : null,
          status: "결제완료",
        };
        set({
          orderList: [...orderList, newOrder],
          selectedCoupon: null,
          finalPrice: 0,
        });
        return newOrder;
      },

      // 배송 관련
    }),
    {
      name: "product-storage", // localStorage key 이름
      // 저장할 항목만 따로 선택할 수도 있음
      partialize: (state) => ({
        wishLists: state.wishLists,
        orderList: state.orderList,
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        cartCount: state.cartCount,
      }),
    }
  )
);
