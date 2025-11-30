import React from "react";
// import Title from '../components/Title';
import "./scss/brand.scss";

const Brand = () => {
  return (
    <div className="sub_page brand_page">
      <div className="brand_banner_wrap">
        <img src="/images/brand_img_01.png" alt="brand_page_banner" />
        <div className="brand_title_wrap">
          <div className="title_video_wrap">
            <video
              src="https://vod.vogue.co.kr/outputs/style_68a2a956166b5/MP4/style_68a2a956166b5_1080p.mp4"
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>

      <div className="inner">
        {/* <Title title="brand" /> */}
        <p className="jibbitz jibbitz_img1">
          <img src="/images/monthly_zibbitz_01.svg" alt="zibbitz_img1" />
        </p>
        <p className="jibbitz jibbitz_img2">
          <img src="/images/monthly_zibbitz_02.svg" alt="zibbitz_img2" />
        </p>
        <p className="jibbitz jibbitz_img3">
          <img src="/images/monthly_zibbitz_03.svg" alt="zibbitz_img3" />
        </p>
        <p className="jibbitz jibbitz_img4">
          <img src="/images/monthly_zibbitz_04.svg" alt="zibbitz_img4" />
        </p>
        <div className="about_crocs_wrap">
          <div className="img_box">
            <img src="/images/brand_img_02.png" alt="brand_img" />
          </div>
          <div className="text_box">
            <h3 className="about_title">BRAND CROCS</h3>
            <div className="about_text">
              크록스™ 브랜드는 개인의 성격과 라이프스타일을 반영하며, 자신의
              발에 꼭 맞고 잘 어울리는 신발을 원하는 사람들을 위한 혁신, 즐거움,
              편안함을 상징합니다. 이제 크록스™는 그 어느 때보다 다양한 스타일과
              용도의 제품을 갖추고, 어떤 장소에서도 더 나은 편안함을 제공하기
              위해 한 단계 더 도약하고 있습니다.
            </div>
          </div>
        </div>
        <div className="about_crocs_wrap">
          <div className="text_box">
            <h3 className="about_title">Come As You Are</h3>
            <div className="about_text">
              Come As You Are는 크록스가 세상에 전하는 선언이자, 모든 사람이
              있는 그대로의 모습으로 편안하게 지내길 바라는 초대의 메시지입니다.
              이 정신은 우리의 문화와 모든 활동 속에 깊이 스며 있습니다. 우리는
              각 개인의 특별함을 존중하며 다양한 사람들과 함께합니다. 서로
              함께할 때, 모든 사람이 자신답게 편안함을 느낄 수 있는 세상을
              만들어 갈 수 있다고 믿습니다.
            </div>
          </div>
          <div className="img_box">
            <img src="/images/brand_img_03.png" alt="brand_img" />
          </div>
        </div>
        <div className="about_crocs_wrap">
          <div className="img_box">
            <img src="/images/brand_img_04.png" alt="brand_img" />
          </div>
          <div className="text_box">
            <h3 className="about_title">About CROCS</h3>
            <div className="about_text">
              미국 콜로라도 볼더에서 소박하게 시작한 크록스™는 현재 전 세계
              남녀노소 누구나 즐겨 신는 브랜드로 성장했습니다. 다양한 컬렉션을
              통해 사계절 언제나 잘 어울리는 컬러풀하고 가벼운 편안함을
              제공합니다. 크록스만의 특징인 Croslite™ 소재는 부드럽고 가벼우며
              냄새와 미끄러짐에 강해 많은 사람들이 사랑하는 편안한 착화감을
              선사합니다. 이러한 장점 덕분에 크록스™ 신발은 전문적인 용도는
              물론, 여가 활동과 캐주얼 스타일에도 잘 어울리며 지금까지 1억 켤레
              이상 판매되었습니다. 많은 사람들에게 사랑받아온 크록스를 직접
              착용해보세요. 당신의 발이 고마움을 느낄지도 모릅니다.
            </div>
          </div>
        </div>
        <div className="about_crocs_wrap">
          <div className="text_box">
            <h3 className="about_title">CROCS is</h3>
            <div className="about_text">
              <h4 className="about_title">혁신</h4>
              <p>
                크록스™가 다른 신발과 차별화되는 이유는 혁신적인 사고와 업계를
                선도하는 기술, 세심한 디테일, 그리고 건강을 고려한 설계에
                있습니다. 그 모든 중심에는 언제나 ‘발’이라는 본질이 있습니다.
              </p>
              <br />
              <h4 className="about_title">즐거움</h4>
              <p>
                크록스™는 다양한 컬러, 스마트한 디자인, 그리고 브랜드 메시지까지
                모두를 통해 긍정적이고 즐거운 경험을 선사하기 위해 노력합니다.
              </p>
              <br />
              <h4 className="about_title">편안함</h4>
              <p>
                크록스™의 핵심은 최상의 편안함입니다. 발전된 인체공학적 디자인,
                초경량 기술, 발바닥 마사지 효과 등 혁신적인 요소들이 머리부터
                발끝까지 편안함을 제공합니다.
              </p>
              <br />
              <h4 className="about_title">단순함</h4>
              <p>
                크록스™는 실용적인 디자인과 다양한 기능을 바탕으로 다른 제품과
                차별화됩니다. 과한 포장보다 단순함을 지향하며, 때로는 그것이
                가장 좋은 선택이 될 수 있다고 믿습니다.
              </p>
            </div>
          </div>
          <div className="img_box">
            <img src="/images/brand_img_05.png" alt="brand_img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
