import React, { useEffect, useState } from 'react';
import "../styles/sideMenu.css";
import { Tooltip } from 'devextreme-react/tooltip';
import 'devextreme/dist/css/dx.light.css';
// import { mainMenuCheck } from "configure-iamdatabinder";
import { mainMenuCheck } from "new-iamdatabinder";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { fields } from '../utils/assets'

const Sidebar = ({ token, orgId, isOpenByDefault, appName, onPermissionSelect, projectName, projectId, appId, baseURL, homeURL, customerId, flowURL, onTimeDiffReceived, onSidebarError, roleId, onActiveItemChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [activeItemId, setActiveItemId] = useState(null);
  const [activeParentId, setActiveParentId] = useState(null);
  const [sidebarData, setSidebarData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedSubmenuId, setSelectedSubmenuId] = useState(null);
  const [expandedMenuId, setExpandedMenuId] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get current route

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.UserId;

  const handleItemClick = (permission) => {
    const isSame = expandedMenuId === permission.PermissionMappingId;

    setExpandedMenuId(isSame ? null : permission.PermissionMappingId);
    setSelectedPermission(isSame ? null : permission);

    setActiveParentId(permission.PermissionMappingId);

    // If the same item is clicked again, deselect
    if (isSame) {
      setActiveItemId(null);
      return;
    }
    // Handle children highlighting if any
    if (permission.Children && permission.Children.length > 0) {
      const firstChild = permission.Children[0];
      setActiveItemId(firstChild.Id);
      setSelectedSubmenuId(firstChild.Id);
      if (onPermissionSelect) {
        onPermissionSelect(firstChild.Id);
      }
      if (firstChild.RouteURL && location.pathname !== firstChild.RouteURL) {
        navigate(firstChild.RouteURL);
      }

    } else {
      setActiveItemId(permission.PermissionMappingId);
      setSelectedSubmenuId(null); // clear submenu selection
      if (onPermissionSelect) {
        onPermissionSelect(permission.Id);
      }
      if (permission.RouteURL && location.pathname !== permission.RouteURL) {
        navigate(permission.RouteURL);
      }

    }
  };

  useEffect(() => {
    setActiveItemId(null);
    setActiveParentId(null);
    setSelectedSubmenuId(null);
    setExpandedMenuId(null);
    setSelectedPermission(null);
    const fetchPermisionAccess = async () => {
      try {
        debugger
        const response = await mainMenuCheck(`${userId}`, `${orgId}`, `${token}`, `${appId}`, `${projectId}`, `${baseURL}`);
        setSidebarData(response);


        const allOrgApps = response?.OrgDetails?.[0]?.AppDetails || [];

        if (allOrgApps.length === 0) {
          onSidebarError("You are not assigned to this project.");
          return;
        }

        // Auto-select first app if available
        if (allOrgApps.length > 0) {
          // setSelectedApp(allOrgApps[0]);
          setActiveItemId(allOrgApps[0].AppId);
        }

        // Find app matching the current appId prop
        const filteredApp = response?.OrgDetails?.[0];
        const appDetails = filteredApp?.AppDetails?.find((detail) => detail.AppId === appId);
        if (appDetails) {

          const userRoles = appDetails.UserRole || [];

          let selectedRole;

          if (userRoles.length === 1) {
            selectedRole = userRoles[0];
          } else if (userRoles.length > 1 && roleId) {
            selectedRole = userRoles.find(role => role.Id === roleId);
          }

          if (!selectedRole) {
            selectedRole = userRoles.find(role => role.isDefault === true) || userRoles[1];
          }

          // let selectedRole = userRoles.find(role => role.isDefault === true);

          // if (!selectedRole && userRoles.length > 0) {
          //   selectedRole = userRoles[0];
          // }
          setSelectedApp(selectedRole);

          if (selectedRole) {
            const filteredPermissions = selectedRole?.Permissions?.filter((permission) => {
              const isSetupItems = (
                permission.Name === "Setup" ||
                permission.Name === "TL Setup Dashboard" ||
                permission.Name === "Allocation"
              );

              const isReportItem = permission.Name === "Inbox Reports";

              if (projectName === "flowreports") {
                return isReportItem;
              }

              if (projectName === "Setup") {
                return isSetupItems;
              }

              if (projectName === "Inbox") {
                return !isSetupItems && !isReportItem;
              }

              return true;
            }) || [];

            if (filteredPermissions.length > 0) {
              // Try to match current URL with any permission or child route
              let matched = null;
              for (const perm of filteredPermissions) {
                if (perm.RouteURL === location.pathname) {
                  matched = { parent: perm };
                  break;
                }
                for (const child of perm.Children || []) {
                  if (child.RouteURL === location.pathname) {
                    matched = { parent: perm, child };
                    break;
                  }
                  for (const subChild of child.Children || []) {
                    if (subChild.RouteURL === location.pathname) {
                      matched = { parent: perm, child, subChild };
                      break;
                    }
                  }
                  if (matched) break;
                }
                if (matched) break;
              }

              const fallback = filteredPermissions.find(p => p.PriorityId === 1) || filteredPermissions[0];
              const usedPermission = matched?.parent || fallback;

              setSelectedPermission(usedPermission);
              setActiveParentId(usedPermission.PermissionMappingId);
              setExpandedMenuId(usedPermission.PermissionMappingId);

              if (matched?.subChild) {
                setActiveItemId(matched.subChild.Id);
                setSelectedSubmenuId(matched.subChild.Id);
                if (onPermissionSelect) onPermissionSelect(matched.subChild.Id);
              } else if (matched?.child) {
                setActiveItemId(matched.child.Id);
                setSelectedSubmenuId(matched.child.Id);
                if (onPermissionSelect) onPermissionSelect(matched.child.Id);
              } else {
                setActiveItemId(usedPermission.PermissionMappingId);
                setSelectedSubmenuId(null);
                if (onPermissionSelect) onPermissionSelect(usedPermission.Id);
              }

              // Navigate only on blank root route
              if ((location.pathname === "/" || location.pathname === "") && usedPermission.RouteURL) {
                navigate(usedPermission.RouteURL);
              }
            }

            // if (filteredPermissions.length > 0) {
            //   const defaultPermission = filteredPermissions.find(p => p.PriorityId === 1) || filteredPermissions[0];

            //   // setActiveItemId(defaultPermission.PermissionMappingId);
            //   setActiveParentId(defaultPermission.PermissionMappingId);
            //   setSelectedPermission(defaultPermission);
            //   setExpandedMenuId(defaultPermission.PermissionMappingId);
            //   if (defaultPermission.Children?.length > 0) {
            //     const firstChild = defaultPermission.Children[0];
            //     setActiveItemId(firstChild.Id);
            //     setSelectedSubmenuId(firstChild.Id);

            //     if (onPermissionSelect) {
            //       onPermissionSelect(firstChild.Id);
            //     }

            //     // ✅ Only navigate if the user is on base/root route
            //     if (location.pathname === "/" || location.pathname === "") {
            //       if (firstChild.RouteURL) {
            //         navigate(firstChild.RouteURL);
            //       }
            //     }

            //   } else {
            //     setActiveItemId(defaultPermission.PermissionMappingId);

            //     if (onPermissionSelect) {
            //       onPermissionSelect(defaultPermission.Id);
            //     }

            //     if (location.pathname === "/" || location.pathname === "") {
            //       if (defaultPermission.RouteURL) {
            //         navigate(defaultPermission.RouteURL);
            //       }
            //     }

            //   }

            // }
          }
        }
      } catch (error) {
        console.error("Error fetching permission data:", error);
      }
    };

    fetchPermisionAccess();
  }, [projectId, roleId]);
  const openOrFocusWindow = () => {
    const win = window.open(homeURL, 'MyUniqueWindowName'); // name is important
    if (win) {
      win.focus();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (projectId && customerId) {
        const url = `${flowURL}CustomerProjects/GetUTCTOISTMins`;
        const payload = {
          CustomerIds: [customerId],
          ProjectIds: [projectId]
        };

        try {
          const response = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' }
          });

          const diff = response.data?.[0]?.UTC_IST_DiffMin;

          if (onTimeDiffReceived && typeof onTimeDiffReceived === 'function') {
            onTimeDiffReceived(diff);
          }
        } catch (err) {
          console.error("Failed to fetch UTC/IST diff:", err);
        }
      }
    };

    fetchData();
  }, [projectId]);


  const getImageForApp = (appName) => {
    const match = fields?.find((item) => item.name === appName);
    return match?.byte || null;
  };

  return (
    <div className="packagesidenav" sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
      <div
        className={`menu drawer-closed`}
        style={{
          width: "47px !important", // Adjust width based on drawer state
          transition: "width 0.3s ease",
          overflow: "hidden", // Hide overflow when closed
          borderRightWidth: "1px",
          borderRightColor: "#ccc", //
          borderRight: "1px solid #ccc !important"
          // borderStyle: "solid",
        }}
      >
        <div className='menu-ul-list'>
          <ul className="flowsidebar-list">
            {selectedApp && (
              <li
                className="flowsidebar-item"
                id="flowsidebar-item-home" // for tooltip targeting
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: isDrawerOpen ? "10px 15px" : "10px 8px",
                  backgroundColor: activeItemId === "home" ? "#113e70" : "transparent",
                  color: activeItemId === "home" ? "white" : "inherit",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveItemId("home");
                  setActiveParentId(null);
                  openOrFocusWindow();
                }}
              >
                <span className="flowsidebar-link">
                  <span
                    className="flowsidebar-content"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i className="icon">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNMjQwLTIwMGgxMjB2LTI0MGgyNDB2MjQwaDEyMHYtMzYwTDQ4MC03NDAgMjQwLTU2MHYzNjBabS04MCA4MHYtNDgwbDMyMC0yNDAgMzIwIDI0MHY0ODBINTIwdi0yNDBoLTgwdjI0MEgxNjBabTMyMC0zNTBaIi8+PC9zdmc+"
                        alt="Home"
                        className="flowsidebar-icon"
                        style={{
                          height: "24px",
                          width: "24px",
                          background: activeItemId === "home" ? "#fff" : "transparent",
                          borderRadius: activeItemId === "home" ? "3px" : "0px",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </i>
                  </span>
                </span>

                {/* ✅ Tooltip for Home */}
                <Tooltip
                  target="#flowsidebar-item-home"
                  showEvent="mouseenter"
                  hideEvent="mouseleave"
                  position="right"
                  shading={false}
                  animation={{
                    show: { type: "fade", duration: 200 },
                    hide: { type: "fade", duration: 200 },
                  }}
                  contentRender={() => (
                    <div className="tooltip-text">Home</div>
                  )}
                />
              </li>
            )}
            {selectedApp ? (
              selectedApp?.Permissions.filter((permission) => {
                debugger
                const isSetupItems = (
                  permission.Name === "Setup" ||
                  permission.Name === "TL Setup Dashboard" ||
                  permission.Name === "Allocation"
                );
                const isReportItem = permission.Name === "Inbox Reports";
                if (projectName === "flowreports") {
                  return isReportItem;
                }

                if (projectName === "Setup") {
                  return isSetupItems;
                }

                if (projectName === "Inbox") {
                  return !isSetupItems && !isReportItem;
                }

                return true;
              }).map((permission) => (
                <React.Fragment key={permission.PermissionMappingId}>
                  <li
                    className="flowsidebar-item active"
                    id={`flowsidebar-item-${permission.PermissionMappingId}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: isDrawerOpen ? "10px 15px" : "10px 8px",
                      backgroundColor:
                        activeParentId === permission.PermissionMappingId
                          ? "#113e70"
                          : "transparent",
                      color:
                        activeParentId === permission.PermissionMappingId
                          ? "white"
                          : "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleItemClick(permission);
                    }}
                  >
                    <Link
                      to={permission.RouteURL}
                      className="flowsidebar-link"
                    >
                      <span
                        className="flowsidebar-content"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i className="icon">
                          <img
                            src={getImageForApp(permission?.Name) || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAA59JREFUeF7tnM+uDEEUxr/7HiQ8g7uR8AiWLAhhg4VYiA0brNjIXYgFNv4kJCw9AokNz0DCezDldsfcmzHVp85XXV1VX29mU6fq1Pc7f2Z6unoHuooqsFN0dS0OASgcBALQGICrAE4BOA3gWOG9sZf/AeATgM8AnrMmZ2bAVwAnWI4tfJ5vAHYZPrIAvAdwluFQRXN8AHDO6y8DwEUAr72OVGp/CcAbj+8MAD1G/6i5OwsYAH4COOKJgoptfwE46vGfAeC3x4EGbF0auowH8QTAEUVzAGCssb7FGPCq1mM425QgG4I56/4EIF4+BOCQRlkFUQYUjkgBEIC4Ai2XBGVAnL96gDLggAKub5Iu44m/hBlr6IfYlsrQVElQD1APiCtg7AHmCSszcJVYl/HEHlCZnmZ3XRq6jAXgrwIuDV3GAiAA5nqRwcAVxC5jZYAyIENAm6d0BbHLWBlQRwYwIOtWhG5F/FcBV4C5jCeWIMYaygBlgDJgVKCpu6+M8tCUILodHf8a3hRwZUBh4AIgAHEFjH8AMYJqtq+9DGebqslqwvGEaAr4HBkQl7TuES4NXcYTb0XULW/ce5eGLuPBt+8NnoqPy74/IpyePz518KZxDADhjHA4K9zjFc4Ih7PCyRcDQHg/xLNkD+o2vOZ9bwQDQJCwp/dEjCFDeV8EC0BwqqcT8+4T8iNFJoAwZ+gFZwCcbPD0fDgV/2X1RpiP3vdDrFddNoC6K3oB7wWggOjKgMKiC0DHAO4Pex8/FyRFGVfm7AFB9HvDNh+sPgXB+2y7IWbWxR/NBGEmAJvEF4RBgdwlaJv4gpA5A6aI3z2EXBlgEf8hgLuGftLU0BwALOI/BnC7KUWNm2EDsIj/BMBNo7/NDWcCsIgf/sC53pyaCRtiAbCI/xLAlQRfmzRhALCI/xbAhSaVTNyUF4BF/EQXF2/m0tBjLPH3Y8OjYbKxxP+XmLMDkPgHq6IAFO4SswMI+1UWFCxB49KCULAJC8ICMiAFwjsA5wvX7EUt72ogazuxlKNXq8e6Ly9KhYLOsABYG/MLAOGp6u4vJgArhKcAbvROgA3ACmEPwK2eIeQAYIXwCMCdXiHkAmCF0O0zQjkBTIXQrfjuW6kTy4YezNoiVO4M2PZjrevIH4WZC8DhciTxBwJzAhghrH9OrGLtDpsbQLtKJu5MABKFY5kJAEvJxHkEIFE4lpkAsJRMnEcAEoVjmQkAS8nEeQQgUTiW2R8vsKZhYKILyAAAAABJRU5ErkJggg=="}
                            alt={permission.Name}
                            className="flowsidebar-icon"
                            style={{
                              height: "24px",
                              width: "24px",
                              background:
                                activeParentId === permission.PermissionMappingId
                                  ? "#fff"
                                  : "transparent",
                              borderRadius:
                                activeParentId === permission.PermissionMappingId
                                  ? "3px"
                                  : "0px",
                              transition: "all 0.3s ease", // Smooth transition for styles
                            }}
                          />
                        </i>
                      </span>
                    </Link>
                    <Tooltip
                      target={`#flowsidebar-item-${permission.PermissionMappingId}`}
                      showEvent="mouseenter"
                      hideEvent="mouseleave"
                      position="right"
                      shading={false}
                      animation={{
                        show: { type: "fade", duration: 200 },
                        hide: { type: "fade", duration: 200 },
                      }}
                      contentRender={() => (
                        <div className="tooltip-text">{permission.Name}</div>
                      )}
                    />
                  </li>
                </React.Fragment>
              ))
            ) : (
              <li className="flowsidebar-item"></li>
            )}
          </ul>
        </div>
      </div>
      <div>
        {selectedPermission?.Children.length > 0 ? (
          selectedPermission?.Children &&
          expandedMenuId === selectedPermission.PermissionMappingId && (
            <ul className="submenu secondmenu">
              {selectedPermission.Children.map((child) => (
                <li
                  key={child.Id}
                  className="flowsidebar-item"
                  style={{
                    backgroundColor: activeItemId === child.Id ? "#d3e4f7" : "transparent",
                    color: activeItemId === child.Id ? "#fff" : "#000",
                    cursor: "pointer",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => {
                    setActiveItemId(child.Id);
                    onPermissionSelect(child.Id);
                    setActiveParentId(selectedPermission.PermissionMappingId); // preserve parent highlight
                  }}
                >
                  <Link to={child.RouteURL} className="flowsidebar-link">
                    <span
                      className="flowsidebar-content"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="icon">
                        <img
                          src={getImageForApp(child.Name) || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAA59JREFUeF7tnM+uDEEUxr/7HiQ8g7uR8AiWLAhhg4VYiA0brNjIXYgFNv4kJCw9AokNz0DCezDldsfcmzHVp85XXV1VX29mU6fq1Pc7f2Z6unoHuooqsFN0dS0OASgcBALQGICrAE4BOA3gWOG9sZf/AeATgM8AnrMmZ2bAVwAnWI4tfJ5vAHYZPrIAvAdwluFQRXN8AHDO6y8DwEUAr72OVGp/CcAbj+8MAD1G/6i5OwsYAH4COOKJgoptfwE46vGfAeC3x4EGbF0auowH8QTAEUVzAGCssb7FGPCq1mM425QgG4I56/4EIF4+BOCQRlkFUQYUjkgBEIC4Ai2XBGVAnL96gDLggAKub5Iu44m/hBlr6IfYlsrQVElQD1APiCtg7AHmCSszcJVYl/HEHlCZnmZ3XRq6jAXgrwIuDV3GAiAA5nqRwcAVxC5jZYAyIENAm6d0BbHLWBlQRwYwIOtWhG5F/FcBV4C5jCeWIMYaygBlgDJgVKCpu6+M8tCUILodHf8a3hRwZUBh4AIgAHEFjH8AMYJqtq+9DGebqslqwvGEaAr4HBkQl7TuES4NXcYTb0XULW/ce5eGLuPBt+8NnoqPy74/IpyePz518KZxDADhjHA4K9zjFc4Ih7PCyRcDQHg/xLNkD+o2vOZ9bwQDQJCwp/dEjCFDeV8EC0BwqqcT8+4T8iNFJoAwZ+gFZwCcbPD0fDgV/2X1RpiP3vdDrFddNoC6K3oB7wWggOjKgMKiC0DHAO4Pex8/FyRFGVfm7AFB9HvDNh+sPgXB+2y7IWbWxR/NBGEmAJvEF4RBgdwlaJv4gpA5A6aI3z2EXBlgEf8hgLuGftLU0BwALOI/BnC7KUWNm2EDsIj/BMBNo7/NDWcCsIgf/sC53pyaCRtiAbCI/xLAlQRfmzRhALCI/xbAhSaVTNyUF4BF/EQXF2/m0tBjLPH3Y8OjYbKxxP+XmLMDkPgHq6IAFO4SswMI+1UWFCxB49KCULAJC8ICMiAFwjsA5wvX7EUt72ogazuxlKNXq8e6Ly9KhYLOsABYG/MLAOGp6u4vJgArhKcAbvROgA3ACmEPwK2eIeQAYIXwCMCdXiHkAmCF0O0zQjkBTIXQrfjuW6kTy4YezNoiVO4M2PZjrevIH4WZC8DhciTxBwJzAhghrH9OrGLtDpsbQLtKJu5MABKFY5kJAEvJxHkEIFE4lpkAsJRMnEcAEoVjmQkAS8nEeQQgUTiW2R8vsKZhYKILyAAAAABJRU5ErkJggg=="}
                          // src={child?.FileModel?.FileByte}
                          alt={child.Name}
                          className="flowsidebar-icon"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "10px",
                          }}
                        />
                      </i>
                      {<span>{child.Name}</span>}
                    </span>
                  </Link>
                  {/* Render submenu if child has children */}
                  {child.Children && (
                    <ul className="submenu">
                      {child.Children.map((subChild) => (
                        <li
                          key={subChild.Id}
                          className="flowsidebar-item"
                          style={{
                            backgroundColor: selectedSubmenuId === subChild.Id ? "#d3e4f7" : "transparent", // Highlight selected submenu
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            borderRadius: '5px'
                          }}
                          onClick={() => {
                            setSelectedSubmenuId(subChild.Id);
                            setActiveItemId(subChild.Id);
                            setActiveParentId(selectedPermission.PermissionMappingId);
                          }}
                        >
                          <Link to={subChild.RouteURL} className="flowsidebar-link">
                            <span
                              className="flowsidebar-content"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i className="icon">
                                <img
                                  src={subChild?.FileModel?.FileByte}
                                  alt={subChild.Name}
                                  className="flowsidebar-icon"
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    marginRight: "10px",
                                  }}
                                />
                              </i>
                              {<span>{subChild.Name}</span>}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )
        ) : (
          <></>)}
      </div>
    </div>
  );
};

export default Sidebar;



