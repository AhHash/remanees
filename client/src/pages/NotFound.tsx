import { NavLink } from "react-router-dom";
import Image from "../assets/cat.svg";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <img src={Image} id="image" alt="not found" />
      <div className="content">
        <h1 id="title">404! Not found &nbsp; :(</h1>
        <NavLink id="link" to="/">
          {" "}
          Back Home
        </NavLink>
      </div>
    </Wrapper>
  );
};
export default NotFound;

const Wrapper = styled.div`
  max-width: 1070px;
  width: 90%;
  height: 100vh;
  background-color: var(--light-violet);
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    #title {
      color: var(--white);
    }

    #link {
      font-size: 2rem;
      margin-top: -1rem;
      color: var(--gray-1);
    }
  }
`;
