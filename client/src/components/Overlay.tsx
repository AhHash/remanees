import React, { ReactElement } from "react";
import styled from "styled-components";

const Overlay = ({ children, className }: any) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;
  width: 80%;
  background-color: var(--gray-1);
  opacity: 0.975;
  border: 4px dotted var(--dark-violet);
  border-radius: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
  transition: var(--transition);
  z-index: 9;
`;

export default Overlay;
