import React from "react";
import { SmallSidebar, BigSidebar, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <SmallSidebar />
      <BigSidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
