import React from "react";
import ProfileTab from "../components/ProfileTab";
import OrdersTab from "../components/OrdersTab";
import SettingsTab from "../components/SettingsTab";

export default function TabSwitcher({ tabs, activeTab, onTabChange }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <div>Выберите вкладку</div>;
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor:
                activeTab === tab ? "var(--accent-color)" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-color)",
              border: "1px solid var(--accent-color)",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </>
  );
}
