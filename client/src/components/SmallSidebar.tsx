import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const SmallSidebar = (props: { className: string }) => {
  return (
    <Wrapper className={props.className}>
      <NavLinks />
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
    transition: var(--transition);
    width: 100%;
  }

  .link.active {
    color: var(--black);
  }

  .link-container {
    transition: var(--transition);
    width: 40%;
    height: 5vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .link-container:hover {
    background-color: white;
  }
`;
