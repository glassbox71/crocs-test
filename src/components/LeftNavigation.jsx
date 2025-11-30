import React, { useEffect } from 'react';
import Breadcrumbs from './Breadcrumbs';
import SizeMenu from './SizeMenu';
import FilterMenu from './FilterMenu';
import ColorMenu from './ColorMenu';
import PriceMenu from './PriceMenu';
import './scss/leftNavigation.scss';
import { useCrocsSizeStore } from '../store/useCrocsSizeStore';
import { useParams } from 'react-router-dom';
import { useColorFilterStore } from '../store/useColorFilterStore';

export default function LeftNavigation({
    category,
    subcategory,
    selectedSize,
    onSizeSelect,
    filters = [],
    priceRanges = [],
    colors = [],
}) {
    const { crocsSizes, onFetchSize } = useCrocsSizeStore();
    const { selectedColors, toggleColor } = useColorFilterStore();
    const params = useParams();

    // ⭐ 최종적으로 사용할 category, subcategory
    const finalCategory = category || params.cate || 'new';
    const finalSubcategory = subcategory || params.subcategory || null;

    useEffect(() => {
        onFetchSize();
    }, []);

    // 색상 제거 핸들러
    const handleRemoveColor = (colorToRemove) => {
        toggleColor(colorToRemove);
    };

    // 사이즈 제거 핸들러
    const handleRemoveSize = () => {
        onSizeSelect?.(null);
    };

    return (
        <div className="left_nav__section_wrap">
            <Breadcrumbs category={finalCategory} subcategory={finalSubcategory} />
            <div className="left_nav">
                {/* ⭐ 선택된 필터들을 FilterMenu에 전달 */}
                <FilterMenu
                    selectedColors={selectedColors}
                    selectedSize={selectedSize}
                    onRemoveColor={handleRemoveColor}
                    onRemoveSize={handleRemoveSize}
                />

                <div className="breadcrumbs__line" />

                <SizeMenu
                    sizes={crocsSizes}
                    selectedSize={selectedSize}
                    onSizeSelect={onSizeSelect}
                />

                <div className="breadcrumbs__line" />

                <ColorMenu />

                <div className="breadcrumbs__line" />

                {/* <PriceMenu priceRanges={priceRanges} /> */}
            </div>
        </div>
    );
}
