// 'use no memo';

import React, { useEffect, useState } from 'react';
import { joinStore } from '../store/joinStore';
import { useNavigate } from 'react-router-dom';
import Policy from './Policy';
import './scss/joinform.scss';
import './scss/joinformpolicy.scss';

const JoinForm = () => {
    //변수
    const { onJoin } = joinStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        ID: '',
        password: '',
        email: '',
        birthday: '',
        gender: '',
    });

    // Policy 컴포넌트에서 받는 약관 동의 값
    const [agreeTerms, setAgreeTerms] = useState(false);

    //비밀번호
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordValid, setPasswordValid] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(null);

    //이메일
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('직접입력');
    const [customEmailDomain, setCustomEmailDomain] = useState('');

    // 이메일 도메인 선택지
    const emailDomains = ['직접입력', 'naver.com', 'hanmail.net', 'gmail.com', 'daum.net'];

    useEffect(() => {
        const fullEmail =
            emailDomain === '직접입력'
                ? `${emailLocal}@${customEmailDomain}`
                : `${emailLocal}@${emailDomain}`;

        // 이메일 형식일 때만 formData 업데이트
        if (fullEmail.includes('@') && emailLocal !== '') {
            setFormData((prev) => ({ ...prev, email: fullEmail }));
        }
    }, [emailLocal, emailDomain, customEmailDomain]);

    //메서드
    //회원가입 메서드
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // password를 반드시 state에서 직접 전달
        const finalJoinData = {
            ...formData,
            password: password,
        };

        const result = await onJoin({
            ...finalJoinData,
            navigate,
        });

        if (result) {
            navigate('/userinfo');
        } else {
        }
    };

    // 각각의 input 요소의 값이 변경될 때
    const handleChange = (e) => {
        const { name, value} = e.target;
        // console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    // 비밀번호 검증 함수
    const validatePassword = (pwd) => {
        const hasLetter = /[a-zA-Z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        const typeCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
        const lengthValid = pwd.length >= 8 && pwd.length <= 16;

        return typeCount >= 2 && lengthValid;
    };

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);

        // formData.password 업데이트
        setFormData((prev) => ({ ...prev, password: pwd }));

        if (pwd.length > 0) {
            setPasswordValid(validatePassword(pwd));
        } else {
            setPasswordValid(null);
        }

        if (passwordConfirm.length > 0) {
            setPasswordMatch(pwd === passwordConfirm);
        }
    };

    // 비밀번호 확인 변경 핸들러
    const handlePasswordConfirmChange = (e) => {
        const pwd = e.target.value;
        setPasswordConfirm(pwd);

        if (pwd.length > 0) {
            setPasswordMatch(password === pwd);
        } else {
            setPasswordMatch(null);
        }
    };

    // 유효성 검사
    const validateForm = () => {
        if (!formData.ID) return alert('ID를 입력해주세요.');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.ID)) {
            return alert('ID는 이메일 형식으로 입력해주세요.');
        }
        if (!password) return alert('비밀번호를 입력해주세요.');
        if (!passwordValid) return alert('비밀번호 형식이 올바르지 않습니다.');
        if (!passwordMatch) return alert('비밀번호가 일치하지 않습니다.');

        const finalEmail =
            emailDomain === '직접입력'
                ? `${emailLocal}@${customEmailDomain}`
                : `${emailLocal}@${emailDomain}`;

        if (!emailLocal || !finalEmail.includes('@')) return alert('올바른 이메일을 입력해주세요.');

        if (!agreeTerms) return alert('개인정보 수집 및 이용에 동의해주세요.');

        return true;
    };

    //화면에 뿌려질 내용
    return (
        <div className="join_form_wrap">
            <form id="join_form_id" onSubmit={handleSubmit}>
                <div className="phone_admit">
                    <p>이름</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                        className="admit_input"
                    />
                    <p>전화번호</p>
                    <input
                        type="tel"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        name="phone"
                        placeholder="'-'빼고 숫자만 입력해주세요"
                        onChange={handleChange}
                        className="admit_input"
                    />
                </div>
                <div className="form_line"></div>
                <div className="required">
                    <p className="required_title">
                        필수정보<span>*</span>
                    </p>
                    <input
                        type="email"
                        name="ID"
                        required
                        placeholder="ID"
                        onChange={handleChange}
                        className="required_input"
                    />
                    <p className="required_content">영문/숫자</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="PW"
                        onChange={(e) => {
                            handlePasswordChange(e);
                            setFormData((prev) => ({ ...prev, password: e.target.value }));
                        }}
                        className="required_input"
                    />
                    {passwordValid !== null && (
                        <p className={`password-message ${passwordValid ? 'valid' : 'invalid'}`}>
                            {passwordValid
                                ? '✓ 사용가능한 비밀번호입니다.'
                                : '✗ 사용할 수 없는 비밀번호입니다.'}
                        </p>
                    )}
                    <p className="required_content">영문소문자/숫자, 6-16자</p>
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="PW Check"
                        onChange={handlePasswordConfirmChange}
                        className="required_input"
                    />
                    {passwordMatch !== null && (
                        <p className={`password-message ${passwordMatch ? 'valid' : 'invalid'}`}>
                            {passwordMatch
                                ? '✓ 비밀번호가 일치합니다.'
                                : '✗ 비밀번호가 일치하지 않습니다.'}
                        </p>
                    )}
                    <p className="required_content">영문소문자/숫자, 6-16자</p>
                    <div className="email-input-group">
                        <input
                            type="text"
                            name="email"
                            placeholder=""
                            onChange={(e) => setEmailLocal(e.target.value)}
                            className="required_input"
                        />
                        <span className="email-separator">@</span>
                        {emailDomain === '직접입력' ? (
                            <input
                                type="text"
                                placeholder=""
                                value={customEmailDomain}
                                onChange={(e) => setCustomEmailDomain(e.target.value)}
                                className="required_input"
                            />
                        ) : (
                            <input
                                type="text"
                                className="required_input email-domain"
                                value={emailDomain}
                                readOnly
                            />
                        )}
                        <select
                            className="form-select email-select"
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                        >
                            {emailDomains.map((domain) => (
                                <option key={domain} value={domain}>
                                    {domain}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add_info">
                    <p>생년월일</p>
                    <input type="date" name="birthday" onChange={handleChange} />
                    <p>성별</p>
                    <div className="gender_wrap">
                        <label className="radio">
                            <input type="radio" name="gender" onChange={handleChange} />
                            <span className="radio_custom"></span>
                            남자
                        </label>
                        <label className="radio">
                            <input type="radio" name="gender" onChange={handleChange} />
                            <span className="radio_custom"></span>
                            여자
                        </label>
                    </div>
                </div>
            </form>
            <Policy agreeTerms={agreeTerms} setAgreeTerms={setAgreeTerms} />
            <button type="submit" form="join_form_id" className="join_btn">
                Join
            </button>
        </div>
    );
};

export default JoinForm;
