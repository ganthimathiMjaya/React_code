import React, { useEffect, useState } from 'react';
import { SelectBox, Button } from 'devextreme-react';
import 'devextreme/dist/css/dx.light.css'; 
import logo from '../../assets/arc_flow.png';
import { useLocation } from 'react-router-dom';
import Notify from 'devextreme/ui/notify.js'; 

const Header = () => {
  const [workspace, setWorkspace] = useState("Athena follow-up"); 

  const handleWorkspaceChange = (e) => {
    setWorkspace(e.value); 
  };

  const location = useLocation();

  const pathToDropdown = {
    '/': true,
    '/dashboard': true,
  };

  const [showDropdown, setShowDropdown] = useState(pathToDropdown[location.pathname] || false);

  useEffect(() => {
    setShowDropdown(pathToDropdown[location.pathname] || false);
  }, [location.pathname]);



  const handleNotificationClick = () => {
    Notify('New notification', 'success', 3000); 
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '2px solid #d3d3d3', background: "#f3f3f3" }}>
      <img src={logo} alt="Logo" style={{ width: '100px', marginLeft: "5%" }} />
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <div style={{ marginRight: '1rem', whiteSpace: 'nowrap', fontSize: "14px" }}>
            Current workspace:
          </div>

          <SelectBox
            value={workspace}
            onValueChanged={handleWorkspaceChange}
            dataSource={["Athena follow-up", "Other Workspace"]}
            itemRender={(data) => <div style={{ fontSize: "14px" }}>{data}</div>}
            style={{
              minWidth: '200px',
              backgroundColor: 'white',
              fontSize: "14px",
              height: "32px",
              borderRadius: '5px',
              borderColor: '#e0e0e0',
            }}
          />
        </div>

        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000',
          border: '1px solid #ccc',
          textAlign: 'center',
          marginLeft: '10px'  
        }}>
          K
        </div>
        <Button
          icon="bell" 
          onClick={handleNotificationClick}
          stylingMode="text"
          style={{ marginLeft: '10px' }}
        />
      </div>
    </div>
  );
};

export default Header;
