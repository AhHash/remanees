import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, getUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  isUser: false,
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store: any) => store.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [user]);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const { name, email, password, isUser } = values;

    if (isUser) {
      if (!email || !password) {
        toast.warning("Please enter all values!");
        return;
      }
      dispatch<any>(loginUser({ email, password }));
      return;
    }

    if (!email || !password || !name) {
      toast.warning("Please enter all values!");
      return;
    }
    dispatch<any>(registerUser({ email, password, name }));
  };

  const handleChange: ChangeEventHandler = (event) => {
    setValues({
      ...values,
      [(event.target! as HTMLInputElement).name]: (
        event.target! as HTMLInputElement
      ).value,
    });
  };

  return (
    <>
      <Navbar className="navbar" />
      <Wrapper>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : user ? (
          <>
            <h3>Redirecting...</h3>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <h3 className="form-title">
                {values.isUser ? "login" : "register"}
              </h3>
              <hr />
              <div className="form-fields">
                {!values.isUser && (
                  <div className="form-control">
                    <label htmlFor="name">Name: </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      placeholder="e.g. Anis"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>
                )}

                <div className="form-control">
                  <label htmlFor="email">Email: </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. anis@anis.com"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="passowrd">Password: </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="e.g. ******** :)"
                    onChange={handleChange}
                    value={values.password}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn submit-btn"
                disabled={isLoading}
              >
                submit
              </button>
            </form>
            {values.isUser ? (
              <p>
                Not a member yet?
                <button
                  className="login"
                  onClick={() => {
                    setValues({ ...initialState, isUser: false });
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
                    setValues({ ...initialState, isUser: true });
                  }}
                >
                  login
                </button>
              </p>
            )}
          </>
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
    background: var(--white);
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
