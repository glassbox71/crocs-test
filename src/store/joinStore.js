import { createUserWithEmailAndPassword } from 'firebase/auth';
import { create } from 'zustand';
import { auth, db, googleProvider } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const joinStore = create((set, get) => ({
    onJoin: async ({ name, phone, email, password, birthday, gender, navigate }) => {
        try {
            // 1. Firebase Authentication으로 사용자 생성
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // 2. 기본 웰컴 쿠폰 생성
            const welcomeCoupon = {
                id: `WELCOME_CROCS_${Date.now()}`,
                name: '크록스 코리아 웰컴 3000원 할인 쿠폰',
                discount: 3000,
                type: 'fixed',
                code: `CROCS3000_${firebaseUser.uid.slice(0, 6).toUpperCase()}`,
                issuedAt: new Date(),
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90일 후 만료
                isUsed: false,
            };

            // 3. Firestore에 사용자 정보 저장 (기본 쿠폰 포함)
            const userData = {
                uid: firebaseUser.uid,
                name: name || '',
                phone: phone || '',
                email: email,
                birthday: birthday || '',
                gender: gender || '',
                nickname: '',
                file: '',
                profile: '',
                isClubMember: false,
                coupons: [welcomeCoupon],
                createdAt: new Date(),
            };

            // Firestore의 'users' 컬렉션에 사용자 정보 저장
            const userRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(userRef, userData);

            set({ user: userData });
            console.log('회원가입 완료:', email);
            alert('회원가입 성공! 크록스 코리아 웰컴 쿠폰이 발급되었습니다.');

            // 4. /userinfo 페이지로 이동
            if (navigate) {
                navigate('/userinfo');
                return true;
            }
        } catch (err) {
            console.error('회원가입 오류:', err);
            alert(err.message);
            return false;
        }
    },
    // 이용약관 팝업창
    popUp: {
        show: false,
        // message: '',
    },

    onPolicyPopup: () => {
        set({ popUp: { show: true } });
    },

    // 이용약관 팝업창 끄기

    hidePopup: () => set({ popUp: { show: false, message: '' } }),
}));
