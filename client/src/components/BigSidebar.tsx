import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const BigSidebar = (props: { className: string }) => {
  return (
    <Wrapper className={props.className}>
      <NavLinks />
    </Wrapper>
  );
};

export default BigSidebar;

const Wrapper = styled.div`
  margin: 1rem;
  height: calc(100% - 2rem);
  background: var(--gray-1);
  display: flex;
  flex-direction: column;
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
    height: 100%;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link.active {
    color: var(--black);
  }

  .link-container {
    transition: var(--transition);
    width: 80%;
    height: 40%;
    padding: 0.9rem 0;
    text-align: center;
  }

  .link-container:hover {
    background-color: white;
  }
`;
