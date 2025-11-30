import React from 'react';
import { Link } from 'react-router-dom';

const gnbMenus = [
    { key: 'store', label: 'STORE' },
    { key: 'brand', label: 'BRAND' },
];

const GnbLeft = () => {
    return (
        <ul className="gnb_left">
            {gnbMenus.map((menu) => (
                <li key={menu.key} className={menu.key}>
                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default GnbLeft;
