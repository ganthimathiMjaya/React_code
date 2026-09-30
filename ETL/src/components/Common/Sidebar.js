import React from 'react';
import circleIcon from '../../assets/circle_icons.png';
import mailIcon from '../../assets/mail.png';
import userSettingIcon from '../../assets/user_setting.png';
import "../../styles/custom_field.css";

const Sidebar = () => {
    return (
        <div sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
            <div className="sidepanel">
                <div>
                    <img src={circleIcon} className="tabsection" alt="Circle Icon" />
                </div>
                <div>
                    <img src={mailIcon} className="tabsection" alt="Mail Icon" />
                </div>
                <div>
                    <img src={userSettingIcon} className="tabsection" alt="User Setting Icon" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
