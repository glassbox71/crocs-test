import React from 'react';
import { Link } from 'react-router-dom';

const gnbMenus = [
    { key: 'promotion', label: 'PROMOTION' },
    { key: 'brand', label: 'BRAND' },
];

const GnbMenuLeft = () => {
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

export default GnbMenuLeft;
