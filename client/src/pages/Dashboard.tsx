import React, { useEffect } from "react";
import { SmallSidebar, BigSidebar, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getCompletedTasks, getDueTasks } from "../features/tasks/tasksSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getDueTasks());
    dispatch<any>(getCompletedTasks());
  }, []);

  return (
    <Wrapper>
      <Navbar className="navbar" />
      <SmallSidebar className="small-sidebar" />
      <BigSidebar className="big-sidebar" />
      <div className="content">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "nav" "sidebar" "content";

  .navbar {
    grid-area: nav;
  }

  .sidebar {
    grid-area: sidebar;
  }

  .content {
    grid-area: content;
  }

  @media screen and (min-width: 768px) {
    grid-template-areas: "nav nav" "sidebar content";
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 5fr;
    height: 100vh;

    .small-sidebar {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .big-sidebar {
      display: none;
    }
  }
`;
