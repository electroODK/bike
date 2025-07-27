import React from "react";
import s from "./SideBar.module.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'food-menu', label: 'Bike Menu' },
    { id: 'users', label: 'Users' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className={s.container}>
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`${s.button} ${isActive ? s.active : ""}`}
          >
            <span className={isActive ? s.activeText : s.text}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
