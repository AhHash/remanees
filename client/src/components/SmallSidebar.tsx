import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SmallSidebar = (props: { className: string }) => {
  return (
    <Wrapper className={props.className}>
      {["today", "this week"].map((item, index) => {
        return (
          <NavLink
            key={index.toString()}
            className={({ isActive }) => {
              return isActive ? "active link" : "link";
            }}
            to={
              item == "today"
                ? "/dashboard/"
                : item == "this week"
                ? "weekly"
                : ""
            }
          >
            <h5 className="link-text">{item}</h5>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default SmallSidebar;

const Wrapper = styled.div`
  margin: 0.5rem;
  height: 7vh;
  background: var(--gray-1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid var(--light-violet);
  border-radius: 10px;

  .link-text {
    margin: 0;
  }

  .link {
    text-transform: capitalize;
    color: var(--gray-2);
    margin: 0;
  }

  .link.active {
    color: var(--black);
  }
`;
