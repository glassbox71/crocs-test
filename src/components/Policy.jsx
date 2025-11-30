import React, { useState } from "react";
import { joinStore } from "../store/joinStore";
import PolicyPopup from "./PolicyPopup";

const Policy = ({ agreeTerms, setAgreeTerms }) => {
  const { onPolicyPopup } = joinStore();

  return (
    <div className="policy_wrap">
      <div className="policy_top">약관 전체 동의</div>
      <div className="policy_middle">
        <div className="policy_checklist">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <div>(필수) 이용약관 동의</div>
          <div
            onClick={() => {
              onPolicyPopup();
            }}
          >
            <img src="/images/icon-arrow-down.svg" alt="icon-down" />
          </div>
        </div>

        <div className="policy_checklist">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <div>(필수) 개인정보 수집 및 이용 동의</div>
          <div
            onClick={() => {
              onPolicyPopup();
            }}
          >
            <img src="/images/icon-arrow-down.svg" alt="icon-down" />
          </div>
        </div>
        <div className="policy_checklist">
          <input type="checkbox" />
          <div>(선택) 개인정보 수집 및 이용 동의</div>
          <div
            onClick={() => {
              onPolicyPopup();
            }}
          >
            <img src="/images/icon-arrow-down.svg" alt="icon-down" />
          </div>
        </div>
      </div>

      <div className="policy_bottom"></div>
      <PolicyPopup />
    </div>
  );
};

export default Policy;
