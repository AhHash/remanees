import React, { useState } from "react";
import styled from "styled-components";
import { Navbar } from "../components";

const Register = () => {
  const [isUser, setIsUser] = useState(false);

  return (
    <>
      <Navbar />
      <Wrapper>
        <form>
          <h3 className="form-title">{isUser ? "login" : "register"}</h3>
          <hr />
          <div className="form-fields">
            {!isUser && (
              <div className="form-control">
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" placeholder="e.g. Anis" />
              </div>
            )}

            <div className="form-control">
              <label htmlFor="email">Email: </label>
              <input id="email" type="email" placeholder="e.g. anis@anis.com" />
            </div>
            <div className="form-control">
              <label htmlFor="passowrd">Password: </label>
              <input
                id="password"
                type="password"
                placeholder="e.g. ******** :)"
              />
            </div>
          </div>
          <button type="submit" className="btn submit-btn">
            submit
          </button>
        </form>
        {isUser ? (
          <p>
            Not a member yet?
            <button
              className="login"
              onClick={() => {
                setIsUser(false);
              }}
            >
              register
            </button>
          </p>
        ) : (
          <p>
            Already a member?
            <button
              className="login"
              onClick={() => {
                setIsUser(true);
              }}
            >
              login
            </button>
          </p>
        )}
      </Wrapper>
    </>
  );
};

export default Register;

const Wrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    height: auto;
    max-width: 500px;
    width: 50vw;
    min-width: 300px;
    border: 1px solid var(--light-violet);
    border-radius: 30px;
    padding: 1rem;

    .form-title {
      margin: 0.2rem auto;
      text-align: center;
      text-transform: capitalize;
    }

    hr {
      height: 2px;
      border: none;
      background-color: var(--light-violet);
      margin: 2rem auto;
    }

    .form-control {
      height: 4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 1.2rem;

      input {
        width: 100%;
        border: none;
        border-bottom: 1px dashed var(--light-violet);
        line-height: 1rem;
        padding-bottom: 0.4rem;
      }
    }

    .submit-btn {
      box-shadow: none;
      border-width: 2px;
      margin: 1rem auto;
      margin-top: 2rem;
      display: block;
      font-size: 1.2rem;
    }
  }

  .login {
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: var(--light-violet);
    text-transform: capitalize;
  }
`;
