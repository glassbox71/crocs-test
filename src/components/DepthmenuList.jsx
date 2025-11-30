import React from 'react';
import { Link } from 'react-router-dom';
import { menuList } from '../store/menuList';

const DepthmenuList = ({ activeMenu, setActiveMenu }) => {
    return (
        <ul className="depthmenu">
            {menuList.map((menu) => (
                <li
                    key={menu.key}
                    className={`${menu.key} ${activeMenu === menu.key ? 'active' : ''}`}
                    onClick={() => setActiveMenu(menu.key)}
                >
                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default DepthmenuList;
