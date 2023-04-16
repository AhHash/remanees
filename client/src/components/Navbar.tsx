import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <Link to="/">
        <h2>Remanees</h2>
      </Link>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  height: 15vh;
  background: linear-gradient(var(--dark-violet), var(--light-violet));
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
    color: var(--white);
    text-transform: capitalize;
    text-align: center;
  }
`;
