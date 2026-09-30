// SubPanel.js
import React, { useState } from 'react';
import mapping from '../../assets/mapping.png';
import data_preview from '../../assets/data_preview.png';
import connection from '../../assets/connection.png';
import date_refresh from '../../assets/date_refresh.png';
import Desktop from '../../assets/Desktop.png';
import wmapping from '../../assets/wmapping.png';
import wdata_preview from '../../assets/wdata_preview.png';
import wconnection from '../../assets/wconnction.png';
import wdate_refresh from '../../assets/wdate_refresh.png';
import WDesktop from '../../assets/wDesktop.png';
import '../../styles/custom_field.css';
import { Link, useLocation } from 'react-router-dom';



const SubPanel = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleItemClick = (path) => {
    setActivePath(path);
  };

  const getIcon = (path, defaultIcon, whiteIcon) => {
    return activePath === path ? whiteIcon : defaultIcon;
  };

  return (
    <div className="subpanel">
      <ul>
        <li className={activePath === '/data-source' ? 'active' : ''}>
          <Link 
            to="/data-source"
            onClick={() => handleItemClick('/data-source')}
            className={activePath === '/data-source' ? 'active-link' : ''}
          >
            <img src={getIcon('/data-source', Desktop, WDesktop)} className="subpanelimage" alt="" /> Data Source
          </Link>
        </li>
        <li className={activePath === '/field-mapping' ? 'active' : ''}>
          <Link 
            to="/field-mapping"
            onClick={() => handleItemClick('/field-mapping')}
            className={activePath === '/field-mapping' ? 'active-link' : ''}
          >
            <img src={getIcon('/field-mapping', mapping, wmapping)} className="subpanelimage" alt="" /> Field Mapping
          </Link>
        </li>
        <li className={activePath === '/data-preview' ? 'active' : ''}>
          <Link 
            to="/data-preview"
            onClick={() => handleItemClick('/data-preview')}
            className={activePath === '/data-preview' ? 'active-link' : ''}
          >
            <img src={getIcon('/data-preview', data_preview, wdata_preview)} className="subpanelimage" alt="" /> Data Preview
          </Link>
        </li>
        <li className={activePath === '/connection' ? 'active' : ''}>
          <Link 
            to="/connection"
            onClick={() => handleItemClick('/connection')}
            className={activePath === '/connection' ? 'active-link' : ''}
          >
            <img src={getIcon('/connection', connection, wconnection)} className="subpanelimage" alt="" /> Connection
          </Link>
        </li>
        <li className={activePath === '/data-refresh' ? 'active' : ''}>
          <Link 
            to="/data-refresh"
            onClick={() => handleItemClick('/data-refresh')}
            className={activePath === '/data-refresh' ? 'active-link' : ''}
          >
            <img src={getIcon('/data-refresh', date_refresh, wdate_refresh)} className="subpanelimage" alt="" /> Data Refresh
          </Link>
        </li>
      </ul>
    </div>
  );
};


export default SubPanel;
