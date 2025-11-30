import React from 'react';
import { Link } from 'react-router-dom';
import { menuList } from '../store/menuList';

// 메인 메뉴 리스트
// new, women, men, kids, jibbitz, collabs

const MainmenuList = () => {
    return (
        <ul className="main_menu">
            {/* 메뉴리스트의 첫번째 메뉴빼고 map돌리기 */}
            {menuList.slice(1).map((menu) => (
                <li key={menu.key} className={menu.key}>
                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default MainmenuList;
