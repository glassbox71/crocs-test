// src/data/reviews.js
export const reviewsData = {
    205089: {
        // 바야밴드 클로그 상품 ID
        rollup: {
            review_count: 1747,
            average_rating: 4.61,
            recommended_ratio: 0.95,
            properties: [
                {
                    key: 'pros',
                    name: '장점',
                    values: [
                        { label: '가벼움', count: 835 },
                        { label: '편안함', count: 812 },
                        { label: '디자인', count: 701 },
                        { label: '세탁가능', count: 490 },
                    ],
                },
                {
                    key: 'cons',
                    name: '단점',
                    values: [
                        { label: '가격', count: 369 },
                        { label: '사이즈', count: 259 },
                        { label: '디자인', count: 67 },
                    ],
                },
                {
                    key: '크기',
                    name: '사이즈',
                    values: [
                        { label: '작은 것 같음', count: 75 },
                        { label: '잘 맞는 것 같음', count: 400 },
                        { label: '큰 것 같음', count: 22 },
                    ],
                },
                {
                    key: '착용감',
                    name: '착용감',
                    values: [
                        { label: '매우 편안함', count: 115 },
                        { label: '편안함', count: 355 },
                        { label: '불편함', count: 28 },
                    ],
                },
            ],
        },
        reviews: [
            {
                ugc_id: 566988001,
                details: {
                    headline: '괜찮습니다',
                    comments: '아무때나 편하게 신기 좋아요',
                    nickname: '',
                    created_date: 1761898521068,
                    properties: [
                        { key: '크기', value: ['잘 맞는 것 같음'] },
                        { key: '착용감', value: ['편안함'] },
                    ],
                },
                metrics: {
                    rating: 5,
                    helpful_votes: 0,
                    not_helpful_votes: 0,
                },
                media: [],
            },
            {
                ugc_id: 566664403,
                details: {
                    headline: '귀엽고 편안해요',
                    comments:
                        '배송빨랐고 저렴하게 잘구매했어요\n잘신고다니는중^^\n크록스가몇번째인지몰라요',
                    nickname: '',
                    created_date: 1761547941392,
                    properties: [
                        { key: '크기', value: ['잘 맞는 것 같음'] },
                        { key: '착용감', value: ['편안함'] },
                    ],
                },
                metrics: {
                    rating: 5,
                    helpful_votes: 0,
                    not_helpful_votes: 0,
                },
                media: [],
            },
            {
                ugc_id: 564122616,
                details: {
                    headline: 'ㅋㅋㅋㅋ',
                    comments:
                        '사이즈가 다른게 왔네요.\n짝이 안맞으니 뭐 답이없네요.\n다들 신기전에 양쪽 사이즈 체크 후 신어보세요.',
                    nickname: '',
                    created_date: 1758761530244,
                    properties: [],
                },
                metrics: {
                    rating: 2,
                    helpful_votes: 3,
                    not_helpful_votes: 0,
                },
                media: [
                    {
                        id: '564122617',
                        uri: '//res.cloudinary.com/powerreviews/image/upload/f_auto,q_auto,h_768,w_auto/d_portal-no-product-image_ttlfpi.svg/prod/r7ya9q2eyrzdxpmlfdor.jpg',
                        type: 'image',
                        caption: '좌우 사이즈가 다름',
                    },
                ],
            },
            // ... 더 많은 리뷰 추가
        ],
    },
    // 다른 상품들의 리뷰 데이터도 추가 가능
};
