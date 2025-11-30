import React, { useEffect, useRef } from 'react';
import MonthlyCardList from './MonthlyCardList';

const MonthlyRight = ({ isActive }) => {
    const rightRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            if (rightRef.current) {
                e.preventDefault(); // 세로 스크롤 막기
                rightRef.current.scrollLeft += e.deltaY; // 휠로 가로 이동
            }
        };

        const rightEl = rightRef.current;
        if (rightEl) {
            rightEl.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (rightEl) rightEl.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className={`monthly_right ${isActive ? 'active' : ''}`} ref={rightRef}>
            <div className="monthly_card_wrap horizontal">
                <MonthlyCardList />
            </div>
        </div>
    );
};

export default MonthlyRight;
