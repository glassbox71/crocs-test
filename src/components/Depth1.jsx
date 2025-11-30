import React, { useState } from 'react';
import DepthmenuList from './DepthmenuList';
import SubmenuList from './SubmenuList';
import { menuList } from '../store/menuList';
import './scss/depth1.scss';

const Depth1 = ({ setDepthOpen }) => {
    // 서브메뉴 상태 저장
    const [activeMenu, setActiveMenu] = useState('all');
    const [activeSubMenu, setActiveSubMenu] = useState('');

    const currentMenu = menuList.find((m) => m.key === activeMenu);

    return (
        <div
            className="depth_wrap"
            onMouseEnter={() => setDepthOpen(true)}
            onMouseLeave={() => setDepthOpen(false)}
        >
            <div className="depth1">
                <div className="depth1_left">
                    <DepthmenuList activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
                </div>
                <div className="depth1_right">
                    <SubmenuList
                        mainmenu={currentMenu}
                        submenus={currentMenu?.submenu_list}
                        activeSubMenu={activeSubMenu}
                        setActiveSubMenu={setActiveSubMenu}
                    />
                </div>
            </div>
        </div>
    );
};

export default Depth1;
