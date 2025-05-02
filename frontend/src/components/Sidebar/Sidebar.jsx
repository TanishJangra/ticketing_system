import React from "react";
import "./Sidebar.css";
import settingsImg from "../../assets/settingsImg.png";
import teamImg from "../../assets/teamImg.png";
import dashboardImg from "../../assets/dashboardImg.png";
import contactCenterImg from "../../assets/contactCenterImg.png";
import analyticsImg from "../../assets/analyticsImg.png";
import chatBotImg from "../../assets/chatBotImg.png";
import logoImg from "../../assets/logoImg.png";
import {NavLink, useLocation} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const SidebarItems = [
    { label: "Dashboard", icon: dashboardImg, to: "/app/dashboard" },
    { label: "Contact Center", icon: contactCenterImg, to: "/app/contact_center" },
    { label: "Analytics", icon: analyticsImg, to: "/app/analytics" },
    { label: "Team Members", icon: teamImg, to: "/app/team_members" },
    { label: "Chat Bot", icon: chatBotImg, to: "/app/chatbot" },
    { label: "Settings", icon: settingsImg, to: "/app/settings" },
  ];
  return (
    <div className="sidebarContainer">
      <div className="logoHeader">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="sidebarFields">
      {SidebarItems.map((item, index) => {
        const isActive = location.pathname === item.to;
        return (
          <NavLink key={index} to={item.to} className={`fields ${isActive ? 'active' : 'inactive'}`}>
            <img src={item.icon} alt={item.label} />
            {isActive && <p>{item.label}</p>}
          </NavLink>
        );
      })}
      </div>
    </div>
  );
};

export default Sidebar;
