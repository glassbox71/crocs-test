import { create } from 'zustand';

// export const useColorFilterStore = create((set) => ({
//     selectedColors: [],

//     toggleColor: (color) =>
//         set((state) => {
//             const exists = state.selectedColors.find((c) => c.value === color.value);
//             if (exists) {
//                 return {
//                     selectedColors: state.selectedColors.filter((c) => c.value !== color.value),
//                 };
//             }

//             return {
//                 selectedColors: [...state.selectedColors, color],
//             };
//         }),

//     clearColors: () => set({ selectedColors: [] }),
// }));

export const useColorFilterStore = create((set) => ({
    selectedColors: [],

    // toggleColor: (color) =>
    //     set((state) => {
    //         const exists = state.selectedColors.find((c) => c.value === color.value);

    //         let result;
    //         if (exists) {
    //             result = state.selectedColors.filter((c) => c.value !== color.value);
    //         } else {
    //             result = [...state.selectedColors, color];
    //         }

    //         console.log('🔥 toggleColor 실행됨');
    //         console.log('🔥 선택된 color:', color);
    //         console.log('🔥 최종 selectedColors:', result);

    //         return { selectedColors: result };
    //     }),
    toggleColor: (color) =>
        set((state) => {
            console.log('🔥 [toggleColor] 호출됨');
            console.log('🔥 선택한 color.value:', color.value);

            // 클릭한 color.value를 배열로 통일
            const newValues = Array.isArray(color.value) ? color.value : [color.value];

            // 이미 선택된 색인지 판별
            const exists = state.selectedColors.some((selected) => {
                const selectedValues = Array.isArray(selected.value)
                    ? selected.value
                    : [selected.value];

                return newValues.some((v) => selectedValues.includes(v));
            });

            let result;

            if (exists) {
                // 🔥 제거
                result = state.selectedColors.filter((selected) => {
                    const selectedValues = Array.isArray(selected.value)
                        ? selected.value
                        : [selected.value];

                    return !newValues.some((v) => selectedValues.includes(v));
                });

                console.log('🗑 기존 선택 → 제거됨');
            } else {
                // 🔥 추가
                result = [...state.selectedColors, color];
                console.log('➕ 신규 선택 → 추가됨');
            }

            console.log('🔥 최종 selectedColors:', result);

            return { selectedColors: result };
        }),

    clearColors: () => {
        console.log('🔥 색상 전체 제거됨');
        return set({ selectedColors: [] });
    },
}));
