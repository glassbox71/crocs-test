import React from 'react';
import { Link } from 'react-router-dom';

const SubmenuList = ({ mainmenu, submenus, activeSubMenu, setActiveSubMenu }) => {
    if (!submenus) return;
    return (
        <div className="submenu_wrap">
            <p className="menu_title">{mainmenu?.label}</p>
            <ul className="submenu">
                {submenus.map((submenu) => (
                    <li
                        key={submenu.key}
                        className={`${submenu.key} ${
                            activeSubMenu === submenu.key ? 'active' : ''
                        }`}
                        onClick={() => setActiveSubMenu(submenu.key)}
                    >
                        <Link to={`/${mainmenu.key}/${submenu.key}`}>
                            <img src={submenu.imgUrl} alt={submenu.key} />
                            <span>{submenu.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubmenuList;
