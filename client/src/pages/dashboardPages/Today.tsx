import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addTask,
  removeTask,
  updateTask,
} from "../../features/tasks/tasksSlice";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Overlay from "../../components/Overlay";

const Today = () => {
  const tasks = useSelector((store) => (store as any).tasks);
  const { today, todayCompleted } = tasks;
  console.log(tasks);
  const dispatch = useDispatch();

  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");

  if (tasks.tasksLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <Wrapper>
      <Overlay className={add ? "overlay-visible" : "overlay-hidden"}>
        <h2 className="title overlay-title">Add Task</h2>
        <form
          className="add-form"
          onSubmit={() => {
            dispatch<any>(addTask({ name }));
          }}
        >
          <div className="form-row">
            <label htmlFor="name">task name</label>
            <input
              className="form-input"
              type="text"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
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
      </Overlay>
      <div
        className="add-btn"
        onClick={() => {
          setAdd(!add);
        }}
      >
        <AiOutlinePlus />
      </div>
      <div className="container">
        <h3 className="title">Due</h3>
        {today.length > 0 ? (
          today.map((task: any, index: number) => {
            return (
              <article className="task undone" key={index}>
                <h5 className="name">{task.name}</h5>
                <div className="btns">
                  <button
                    className="done-btn btn"
                    onClick={() => {
                      dispatch<any>(updateTask({ ...task, isDone: true }));
                    }}
                  >
                    Mark as {task.isDone ? "undone" : "done"}
                  </button>
                  <button
                    className="done-btn btn"
                    onClick={() => {
                      dispatch<any>(removeTask(task));
                    }}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <h5 className="title">Hooray! No tasks due :)</h5>
        )}
        <hr />
        <h3 className="title">Completed</h3>
        {todayCompleted.length > 0 ? (
          todayCompleted.map((task: any, index: number) => {
            return (
              <article className="task completed" key={index}>
                <h5 className="name">{task.name}</h5>
                <div className="btns">
                  <button
                    className="done-btn btn"
                    onClick={() => {
                      dispatch<any>(updateTask({ ...task, isDone: false }));
                    }}
                  >
                    Mark as {task.isDone ? "undone" : "done"}
                  </button>
                  <button
                    className="done-btn btn"
                    onClick={() => {
                      dispatch<any>(removeTask(task));
                    }}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </article>
            );
          })
        ) : today.length > 0 ? (
          <h5 className="title">Maybe complete some tasks!</h5>
        ) : (
          <h5 className="title">
            Maybe add some tasks and then complete them :)
          </h5>
        )}
      </div>
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div`
  .add-btn {
    position: fixed;
    right: 4rem;
    bottom: 2rem;
    font-size: 3rem;
    border: 2px solid var(--dark-violet);
    height: 4rem;
    width: 4rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--gray-1);
    cursor: pointer;
    z-index: 1;
  }
  .container {
    padding: 0 1.5rem;
  }

  .task {
    border: 2px dotted gray;
    border-radius: 10rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;

    h5 {
      margin: 0;
    }
  }

  .completed {
    background-color: var(--green-light);
  }

  .undone {
    background-color: var(--red-light);
  }

  .done-btn {
    margin: 0;
    padding: 0.5rem;
    border: 0;
  }

  .title {
    margin: 1rem 0;
  }

  .btns {
    display: flex;
    gap: 1rem;
  }

  .overlay-hidden {
    opacity: 0;
  }

  .overlay-title {
    text-align: center;
  }

  .form-row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
    font-size: 1.25rem;
    text-transform: capitalize;
  }

  .add-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
  }

  .form-btn {
    margin-bottom: 3rem;
  }

  .form-input {
    text-align: center;
  }
`;
