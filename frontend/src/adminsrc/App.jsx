import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import AddFoodItemsPage from "./components/addFood";
import Dashboard from "./components/dashboard";
import FoodItemCard from "./components/FoodSide";
import styles from "./App.module.css";
import UserSide from "./components/UsersSide";

const AppAdmin
 = () => {
  const [activeTab, setActiveTab] = useState("food-menu");

  const renderContent = () => {
    switch (activeTab) {
      case "food-menu":
        return <AddFoodItemsPage />;
      case "dashboard":
        return <Dashboard />;
        case "users":
        return <UserSide/>
      default:
        return (
          <div className={styles.pageContent}>
            <h1 className={styles.title}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")}
            </h1>
            <p className={styles.subtitle}>This page is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default AppAdmin
;
