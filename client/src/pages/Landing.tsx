import styled from "styled-components";
import Todo from "../assets/todo.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <div className="title">
        <h1>Remanees</h1>
        <h3 className="fancy">
          your way to <span>organize!&nbsp;</span>
        </h3>
      </div>
      <img src={Todo} alt="todo" id="todo" />
      <svg viewBox="0 0 200 200" id="svg-small">
        <path
          d="M0 47.4235C0 38.0237 6.53608 29.9057 15.7703 28.1488C36.4827 24.2081 73.3424 18 100 18C126.658 18 163.517 24.2081 184.23 28.1488C193.464 29.9057 200 38.0237 200 47.4235V150.374C200 159.424 193.931 167.333 185.12 169.396C164.683 174.181 127.351 181.934 100 181.934C72.6487 181.934 35.3172 174.181 14.8798 169.396C6.06883 167.333 0 159.424 0 150.374V47.4235Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient
            id="gradient"
            x1="100"
            y1="18"
            x2="100"
            y2="181.934"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#451f55" />
            <stop offset="1" stopColor="#724e91" />
          </linearGradient>
        </defs>
      </svg>
      <Link to="/register" className="login">
        <button className="btn login">login / register</button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 2fr;
  justify-content: center;
  align-items: center;
  justify-items: center;

  h1 {
    color: var(--white);
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--white);
    text-align: center;
    font-size: 2.5rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
    margin: 0;
  }

  #svg-small {
    position: absolute;
    top: -200px;
    overflow: hidden;
    max-width: 600px;
    z-index: -1;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  .login {
    font-size: 1.5rem;
  }

  #todo {
    display: none;
  }

  @media screen and (min-width: 990px) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas: "a b" "c b";
    gap: 1rem;
    margin: 2rem;
    height: calc(100vh - 4rem);

    #svg-small {
      display: none;
    }

    .title :is(h1, h3) {
      color: var(--black);
      align-self: end;
    }

    h3 {
      span {
        background-color: var(--gray-1);
      }
    }

    .login {
      grid-area: c;
      align-self: start;
    }

    #todo {
      display: block;
      grid-area: b;
      max-height: 100%;
      max-width: 100%;
      justify-self: center;
    }
  }
`;
export default Landing;
