// import React, { useCallback, useMemo, useState, useEffect } from "react";
// import Drawer from "devextreme-react/drawer";
// import Toolbar from "devextreme-react/toolbar";
// import NavigationList from "./NavigationList.js";
// import themes from "devextreme/ui/themes";
// import "./main.css";
// import 'devextreme/dist/css/dx.common.css';
// import "devextreme/dist/css/dx.light.css"; // Ensure the theme CSS is imported

// const SideMenu = () => {
//   const [opened, setOpened] = useState(true);
//   const [openedStateMode, setOpenedStateMode] = useState("shrink");
//   const [revealMode, setRevealMode] = useState("slide");
//   const [position, setPosition] = useState("left");

//   useEffect(() => {
//     const defaultTheme = "generic.light";
//     try {
//       themes.current(defaultTheme); // Apply the theme
//     } catch (error) {
//       console.error("Failed to set theme:", error);
//     }
//   }, []);

//   const toolbarItems = useMemo(
//     () => [
//       {
//         widget: "dxButton",
//         location: "before",
//         options: {
//           icon: "menu",
//           stylingMode: "text",
//           onClick: () => setOpened(!opened),
//         },
//       },
//     ],
//     [opened]
//   );

//   const onOutsideClick = useCallback(() => {
//     setOpened(false);
//     return false;
//   }, []);

//   return (
//     <div className="flex-container">
//       <Toolbar items={toolbarItems} id="toolbar" />
//       <Drawer
//         opened={opened}
//         openedStateMode={openedStateMode}
//         position={position}
//         revealMode={revealMode}
//         component={NavigationList}
//         closeOnOutsideClick={onOutsideClick}
//         height={400}
//       >
//         <div id="content"></div>
//       </Drawer>
//     </div>
//   );
// };

// export default SideMenu;
// ``
import React, { useState } from 'react';
import Drawer from 'devextreme-react/drawer';
import List from 'devextreme-react/list';

const navigation = [
  { id: 1, text: 'Products', icon: 'dx-icon-product' },
  { id: 2, text: 'Sales', icon: 'dx-icon-money' },
  { id: 3, text: 'Customers', icon: 'dx-icon-group' },
  { id: 4, text: 'Employees', icon: 'dx-icon-card' },
  { id: 5, text: 'Reports', icon: 'dx-icon-chart' },
];

const AppDrawer = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Drawer
      opened={opened}
      onToggle={() => setOpened(!opened)}
      position="left" // Change to "right" if needed
      template={() => (
        <List
          dataSource={navigation}
          displayExpr="text"
          iconExpr="icon" // Ensure the icons map to the `icon` property
        />
      )}
    >
      <div>
        <h1>Content Area</h1>
        <button onClick={() => setOpened(!opened)}>Toggle Drawer</button>
      </div>
    </Drawer>
  );
};

export default AppDrawer;
