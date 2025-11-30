import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { loginAuthStore } from "../../store/loginStore";
import { useProductStore } from "../../store/useProductStore";

const OrderForm = forwardRef((props, ref) => {
  const { subtotal = 0, onCouponUpdate } = props;

  // 로그인 사용자 정보 가져오기
  const { user } = loginAuthStore();

  // ProductStore에서 쿠폰 관련 함수 가져오기
  const { getUserCoupons, onSelectCoupon } = useProductStore();

  // 쿠폰 관련 상태
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // 주문자 정보
  const [ordererName, setOrdererName] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("직접입력");
  const [customEmailDomain, setCustomEmailDomain] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  // 배송지 정보
  const [deliveryType, setDeliveryType] = useState("same");
  const [receiverName, setReceiverName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [deliveryPhone1, setDeliveryPhone1] = useState("");
  const [deliveryPhone2, setDeliveryPhone2] = useState("");
  const [deliveryPhone3, setDeliveryPhone3] = useState("");

  // 비밀번호
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  // 약관 동의
  const [agreeTerms, setAgreeTerms] = useState(false);

  // 결제수단
  const [paymentMethod, setPaymentMethod] = useState("card");

  // 이메일 도메인 선택지
  const emailDomains = [
    "직접입력",
    "naver.com",
    "hanmail.net",
    "gmail.com",
    "daum.net",
  ];

  // 사용 가능한 쿠폰 목록 가져오기
  useEffect(() => {
    if (user) {
      const coupons = getUserCoupons(user);
      setAvailableCoupons(coupons);
    }
  }, [user, getUserCoupons]);

  // 로그인된 사용자 정보 자동 채우기
  useEffect(() => {
    if (user) {
      if (user.name) {
        setOrdererName(user.name);
        setReceiverName(user.name);
      }

      if (user.email) {
        const [local, domain] = user.email.split("@");
        setEmailLocal(local);

        if (emailDomains.includes(domain)) {
          setEmailDomain(domain);
        } else {
          setEmailDomain("직접입력");
          setCustomEmailDomain(domain);
        }
      }

      if (user.phone) {
        const phoneClean = user.phone.replace(/[^0-9]/g, "");
        if (phoneClean.length === 10) {
          setPhone1(phoneClean.slice(0, 3));
          setPhone2(phoneClean.slice(3, 6));
          setPhone3(phoneClean.slice(6, 10));
          setDeliveryPhone1(phoneClean.slice(0, 3));
          setDeliveryPhone2(phoneClean.slice(3, 6));
          setDeliveryPhone3(phoneClean.slice(6, 10));
        } else if (phoneClean.length === 11) {
          setPhone1(phoneClean.slice(0, 3));
          setPhone2(phoneClean.slice(3, 7));
          setPhone3(phoneClean.slice(7, 11));
          setDeliveryPhone1(phoneClean.slice(0, 3));
          setDeliveryPhone2(phoneClean.slice(3, 7));
          setDeliveryPhone3(phoneClean.slice(7, 11));
        }
      }
    }
  }, [user]);

  // 쿠폰 할인 금액 계산
  const calculateDiscount = () => {
    if (!selectedCoupon) return 0;
    if (!subtotal || subtotal <= 0) return 0;

    if (selectedCoupon.type === "percentage") {
      return Math.floor(subtotal * (selectedCoupon.discount / 100));
    } else if (selectedCoupon.type === "fixed") {
      return Math.min(selectedCoupon.discount, subtotal);
    }

    return 0;
  };

  // 특정 쿠폰의 할인 금액 미리보기 계산
  const calculateCouponDiscount = (coupon) => {
    if (!coupon) return 0;
    if (!subtotal || subtotal <= 0) return 0;

    if (coupon.type === "percentage") {
      return Math.floor(subtotal * (coupon.discount / 100));
    } else if (coupon.type === "fixed") {
      return Math.min(coupon.discount, subtotal);
    }

    return 0;
  };

  // 쿠폰 할인 금액 업데이트 및 부모 컴포넌트에 전달
  useEffect(() => {
    const discount = calculateDiscount();
    console.log("쿠폰 할인 계산:", {
      selectedCoupon,
      subtotal,
      calculatedDiscount: discount,
      couponType: selectedCoupon?.type,
      couponDiscount: selectedCoupon?.discount,
    });
    setDiscountAmount(discount);
    if (onCouponUpdate) {
      onCouponUpdate(selectedCoupon, discount);
    }
  }, [selectedCoupon, subtotal, onCouponUpdate]);

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(d.getDate()).padStart(2, "0")}`;
  };

  // 쿠폰 선택 핸들러
  const handleCouponSelect = (coupon) => {
    if (selectedCoupon?.id === coupon.id) {
      setSelectedCoupon(null);
      onSelectCoupon(null);
    } else {
      setSelectedCoupon(coupon);
      onSelectCoupon(coupon);
    }
    setShowCouponModal(false);
  };

  // 유효성 검사 함수 - 부모 컴포넌트에서 호출 가능
  useImperativeHandle(ref, () => ({
    validateForm: () => {
      // 주문자 정보 체크
      if (!ordererName.trim()) {
        alert("입력되지 않은 항목이 있습니다.\n주문자 이름을 입력해주세요.");
        return false;
      }

      if (!emailLocal.trim()) {
        alert("입력되지 않은 항목이 있습니다.\n이메일을 입력해주세요.");
        return false;
      }

      const finalEmailDomain =
        emailDomain === "직접입력" ? customEmailDomain : emailDomain;
      if (!finalEmailDomain.trim()) {
        alert("입력되지 않은 항목이 있습니다.\n이메일 도메인을 입력해주세요.");
        return false;
      }

      if (!phone1 || !phone2 || !phone3) {
        alert("입력되지 않은 항목이 있습니다.\n휴대전화 번호를 입력해주세요.");
        return false;
      }

      // 배송지 정보 체크
      if (!receiverName.trim()) {
        alert("입력되지 않은 항목이 있습니다.\n받는사람 이름을 입력해주세요.");
        return false;
      }

      if (!postcode || !address) {
        alert("입력되지 않은 항목이 있습니다.\n배송지 주소를 입력해주세요.");
        return false;
      }

      if (!deliveryPhone1 || !deliveryPhone2 || !deliveryPhone3) {
        alert(
          "입력되지 않은 항목이 있습니다.\n배송지 휴대전화 번호를 입력해주세요."
        );
        return false;
      }

      // 비회원일 경우에만 비밀번호 체크
      if (!user) {
        if (!password || !passwordConfirm) {
          alert("입력되지 않은 항목이 있습니다.\n비밀번호를 입력해주세요.");
          return false;
        }

        if (!passwordValid) {
          alert(
            "입력되지 않은 항목이 있습니다.\n비밀번호 형식이 올바르지 않습니다."
          );
          return false;
        }

        if (!passwordMatch) {
          alert(
            "입력되지 않은 항목이 있습니다.\n비밀번호가 일치하지 않습니다."
          );
          return false;
        }
      }

      // 약관 동의 체크
      if (!agreeTerms) {
        alert("개인정보 수집 및 이용에 동의하여 주십시오.");
        return false;
      }

      return true;
    },
    getOrderFormData: () => {
      return {
        ordererName,
        email: `${emailLocal}@${
          emailDomain === "직접입력" ? customEmailDomain : emailDomain
        }`,
        phone: `${phone1}-${phone2}-${phone3}`,
        receiverName,
        postcode,
        address,
        detailAddress,
        deliveryPhone: `${deliveryPhone1}-${deliveryPhone2}-${deliveryPhone3}`,
        password: !user ? password : null,
      };
    },
  }));

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

  // 우편번호 검색 (다음 API)
  const handlePostcodeSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert(
        "우편번호 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostcode(data.zonecode);
        setAddress(data.address);
      },
    }).open();
  };

  // 배송지 타입 변경 시 주문자 정보 복사 또는 초기화
  const handleDeliveryTypeChange = (e) => {
    const type = e.target.value;
    setDeliveryType(type);
    if (type === "same") {
      setReceiverName(ordererName);
      setDeliveryPhone1(phone1);
      setDeliveryPhone2(phone2);
      setDeliveryPhone3(phone3);
    } else {
      setReceiverName("");
      setPostcode("");
      setAddress("");
      setDetailAddress("");
      setDeliveryPhone1("");
      setDeliveryPhone2("");
      setDeliveryPhone3("");
    }
  };

  return (
    <div className="order-form">
      {/* 주문자 정보 */}
      <div className="form-section">
        <h2 className="section-title">주문자 정보</h2>

        <div className="form-group">
          <div className="label-row">
            <label className="form-label required">주문자</label>
            <p className="mandatory">
              <span>* </span>표시 입력은 의무사항 입니다.
            </p>
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="이름을 입력하세요"
            value={ordererName}
            onChange={(e) => setOrdererName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label required">이메일</label>
          <div className="email-input-group">
            <input
              type="text"
              className="form-input email-local"
              placeholder="이메일"
              value={emailLocal}
              onChange={(e) => setEmailLocal(e.target.value)}
            />
            <span className="email-separator">@</span>
            {emailDomain === "직접입력" ? (
              <input
                type="text"
                className="form-input email-domain"
                placeholder="도메인 입력"
                value={customEmailDomain}
                onChange={(e) => setCustomEmailDomain(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="form-input email-domain"
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

        <div className="form-group">
          <label className="form-label required">휴대전화</label>
          <div className="phone-input-group">
            <input
              type="text"
              className="form-input phone-input"
              placeholder="010"
              maxLength="3"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <span className="phone-separator">-</span>
            <input
              type="text"
              className="form-input phone-input"
              placeholder="1234"
              maxLength="4"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <span className="phone-separator">-</span>
            <input
              type="text"
              className="form-input phone-input"
              placeholder="5678"
              maxLength="4"
              value={phone3}
              onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
        </div>
      </div>

      {/* 배송지 정보 */}
      <div className="form-section">
        <h2 className="section-title">배송지 정보</h2>

        <div className="delivery-type-group">
          <label className="radio-label">
            <input
              type="radio"
              name="deliveryType"
              value="same"
              checked={deliveryType === "same"}
              onChange={handleDeliveryTypeChange}
            />
            <span className="radio-text">주문자정보와 동일</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="deliveryType"
              value="new"
              checked={deliveryType === "new"}
              onChange={handleDeliveryTypeChange}
            />
            <span className="radio-text">새로운 배송지</span>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label required">받는사람</label>
          <input
            type="text"
            className="form-input"
            placeholder="받는 분 이름"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label required">주소</label>
          <div className="address-input-group">
            <input
              type="text"
              className="form-input postcode-input"
              placeholder="우편번호"
              value={postcode}
              readOnly
            />
            <button
              type="button"
              className="btn-postcode"
              onClick={handlePostcodeSearch}
            >
              주소검색
            </button>
          </div>
          <input
            type="text"
            className="form-input address-input"
            placeholder="기본주소"
            value={address}
            readOnly
          />
          <input
            type="text"
            className="form-input detail-address-input"
            placeholder="나머지 주소 (선택입력가능)"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
          <p className="address-notice">나머지 주소는 선택입력입니다.</p>
        </div>

        <div className="form-group">
          <label className="form-label required">휴대전화</label>
          <div className="phone-input-group">
            <input
              type="text"
              className="form-input phone-input"
              placeholder="010"
              maxLength="3"
              value={deliveryPhone1}
              onChange={(e) =>
                setDeliveryPhone1(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
            <span className="phone-separator">-</span>
            <input
              type="text"
              className="form-input phone-input"
              placeholder="1234"
              maxLength="4"
              value={deliveryPhone2}
              onChange={(e) =>
                setDeliveryPhone2(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
            <span className="phone-separator">-</span>
            <input
              type="text"
              className="form-input phone-input"
              placeholder="5678"
              maxLength="4"
              value={deliveryPhone3}
              onChange={(e) =>
                setDeliveryPhone3(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>
        </div>
      </div>

      {/* 비회원 주문 비밀번호 - 로그인 시 숨김 */}
      {!user && (
        <div className="form-section">
          <h2 className="section-title">비회원 주문 비밀번호</h2>
          <p className="section-description">
            주문조회 시 필요합니다. (영문대소문자구분/숫자/특수문자 중 2가지
            이상 조합, 8자~16자)
          </p>

          <div className="form-group">
            <label className="form-label required">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordValid !== null && (
              <p
                className={`password-message ${
                  passwordValid ? "valid" : "invalid"
                }`}
              >
                {passwordValid
                  ? "✓ 사용가능한 비밀번호입니다."
                  : "✗ 사용할 수 없는 비밀번호입니다."}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">비밀번호 확인</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호 재입력"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            {passwordMatch !== null && (
              <p
                className={`password-message ${
                  passwordMatch ? "valid" : "invalid"
                }`}
              >
                {passwordMatch
                  ? "✓ 비밀번호가 일치합니다."
                  : "✗ 비밀번호가 일치하지 않습니다."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 쿠폰 섹션 - 로그인 사용자만 표시 */}
      {user && (
        <div className="form-section">
          <h2 className="section-title">쿠폰/할인</h2>

          {availableCoupons.length > 0 ? (
            <>
              <div className="coupon-section">
                <button
                  type="button"
                  className="coupon-select-btn"
                  onClick={() => setShowCouponModal(true)}
                >
                  {selectedCoupon
                    ? `${selectedCoupon.name} 적용됨`
                    : `사용 가능한 쿠폰 ${availableCoupons.length}개`}
                </button>

                {selectedCoupon && (
                  <div className="selected-coupon">
                    <div className="coupon-info">
                      <span className="coupon-name">{selectedCoupon.name}</span>
                      <span className="coupon-discount">
                        -{discountAmount.toLocaleString()}원
                      </span>
                    </div>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setSelectedCoupon(null);
                        onSelectCoupon(null);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* 할인 금액 표시 - 쿠폰 선택 시에만 */}
              {selectedCoupon && (
                <div className="discount-amount">
                  <span className="discount-label">할인 적용 금액</span>
                  <span className="discount-value">
                    {discountAmount > 0
                      ? `-${discountAmount.toLocaleString()}원`
                      : "계산 중..."}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="no-coupon-message">사용 가능한 쿠폰이 없습니다.</p>
          )}
        </div>
      )}

      {/* 쿠폰 선택 모달 */}
      {showCouponModal && (
        <div className="coupon-modal" onClick={() => setShowCouponModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>쿠폰 선택</h3>
              <button
                className="close-btn"
                onClick={() => setShowCouponModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="coupon-list">
              {availableCoupons.length === 0 ? (
                <p className="no-coupon">사용 가능한 쿠폰이 없습니다.</p>
              ) : (
                availableCoupons.map((coupon) => {
                  const previewDiscount = calculateCouponDiscount(coupon);

                  return (
                    <div
                      key={coupon.id}
                      className={`coupon-item ${
                        selectedCoupon?.id === coupon.id ? "selected" : ""
                      }`}
                      onClick={() => handleCouponSelect(coupon)}
                    >
                      <div className="coupon-badge">
                        <span className="discount-value">
                          {coupon.discount}
                          {coupon.type === "percentage" ? "%" : "원"}
                        </span>
                      </div>
                      <div className="coupon-details">
                        <h4>{coupon.name}</h4>
                        <p className="coupon-code">코드: {coupon.code}</p>
                        <p className="expire-date">
                          유효기간: {formatDate(coupon.expiresAt)}까지
                        </p>
                      </div>
                      {selectedCoupon?.id === coupon.id && (
                        <span className="check-mark">✓</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 결제수단 */}
      <div className="form-section">
        <h2 className="section-title">결제수단</h2>

        <div className="payment-methods">
          <button
            type="button"
            className={`payment-btn ${
              paymentMethod === "card" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            신용카드
          </button>
          <button
            type="button"
            className={`payment-btn ${
              paymentMethod === "bank" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("bank")}
          >
            무통장입금
          </button>
        </div>
        <p className="payment-notice">
          소액결제의 경우 PG사 정책에 따라 결제금액 제한이 있을 수 있습니다.
        </p>
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className="form-section">
        <div className="terms-agreement">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className="checkbox-text">
              개인정보의 수집 및 이용에 대해 동의합니다.
            </span>
          </label>

          <div className="terms-content">
            <p className="terms-description">
              크록스코리아 주식회사는 아래와 같이 개인정보를 수집 및 이용합니다.
              <br />
              귀하는 아래와 같은 개인정보의 수집·이용에 동의하지 않으실 수
              있으나, 이 경우 제품의 주문, 결제 및 배송이 불가능합니다.
            </p>

            <table className="terms-table">
              <tbody>
                <tr>
                  <th>수집항목</th>
                  <td>
                    이름/회사명, 생년월일, 휴대전화번호, 이메일주소, 비밀번호
                  </td>
                </tr>
                <tr>
                  <th>수집 및 이용목적</th>
                  <td>제품의 주문, 결제 및 배송 주문 조회</td>
                </tr>
                <tr>
                  <th>보유 및 이용기간</th>
                  <td>
                    귀하의 개인정보는 상품 판매가 완료된 때로부터 5년간 보유 및
                    이용됩니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
export default OrderForm;
