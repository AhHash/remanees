import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { addTask } from "../features/tasks/tasksSlice";
import { useDispatch } from "react-redux";

const Overlay = ({ className, setAdd }: any) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    color: "",
    day: "",
  });
  const dispatch = useDispatch();

  return (
    <Wrapper className={className}>
      <h2 className="title overlay-title">Add Task</h2>
      <form
        className="add-form"
        onSubmit={() => {
          dispatch<any>(addTask(task));
          setTask({ ...task, name: "", description: "", color: "", day: "" });
        }}
      >
        <div className="form-row">
          <label htmlFor="name">task name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            placeholder="e.g. Numerical"
            value={task.name}
            onChange={(event) => {
              setTask({ ...task, name: event.target.value });
            }}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">task description</label>
          <textarea
            className="form-input"
            id="description"
            rows={5}
            placeholder="I gotta do my tasks ToT"
            value={task.description}
            onChange={(event) => {
              setTask({ ...task, description: event.target.value });
            }}
          />
        </div>
        <div className="form-row">
          <label htmlFor="color">task color</label>
          <input
            className="form-input"
            type="text"
            id="color"
            placeholder="#FFFFFF or Black"
            value={task.color}
            onChange={(event) => {
              setTask({ ...task, color: event.target.value });
            }}
          />
        </div>
        <div className="form-row">
          <label htmlFor="day">day</label>
          <select
            className="form-select"
            id="day"
            placeholder="1 to 7. 1 is Sunday"
            value={task.day}
            onChange={(event) => {
              setTask({
                ...task,
                day: event.target.value,
              });
            }}
          >
            <option value="0">Kyou</option>
            <option value="1">Nichyoubi</option>
            <option value="2">Getsuyoubi</option>
            <option value="3">Kayoubi</option>
            <option value="4">Tsuiyoubi</option>
            <option value="5">Mokuyoubi</option>
            <option value="6">Kinyoubi</option>
            <option value="7">Doyoubi</option>
          </select>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn form-btn"
            onClick={() => {
              setAdd(false);
            }}
          >
            add
          </button>
          <button
            className="form-btn btn"
            onClick={() => {
              setAdd(false);
            }}
            type="button"
          >
            cancel
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 80%;
  max-width: 30rem;
  background-color: var(--gray-1);
  opacity: 0.95;
  border: 4px dotted var(--dark-violet);
  border-radius: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
  transition: var(--transition);
  z-index: 9;

  .overlay-title {
    text-align: center;
  }

  .form-row {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-top: 1rem; */
    font-size: 1.25rem;
    text-transform: capitalize;
  }

  #day {
    width: 12.4rem;
  }

  .add-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
  }

  textarea {
    resize: none;
    border: none;
  }

  .form-btn {
    margin-bottom: 3rem;
  }

  .form-input {
    text-align: center;
  }
`;

export default Overlay;
