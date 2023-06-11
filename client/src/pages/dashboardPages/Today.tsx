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
  const dispatch = useDispatch();

  console.log(tasks);

  const [add, setAdd] = useState(false);

  if (tasks.tasksLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <Wrapper>
      <Overlay
        className={add ? "overlay-visible" : "overlay-hidden"}
        setAdd={setAdd}
      />
      <div
        className="add-btn"
        onClick={() => {
          console.log(add);
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
                <div
                  className="circle circle-red"
                  style={{ backgroundColor: task.color || "black" }}
                ></div>
                <div className="task-text">
                  <h5 className="name">{task.name}</h5>
                  <p className="description-hidden">{task.description}</p>
                </div>
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
                <div
                  className="circle circle-green"
                  style={{ backgroundColor: task.color || "black" }}
                ></div>
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
    position: relative;

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
    display: none;
  }

  .circle {
    height: 18px;
    width: 18px;
    border-radius: 11px;
    position: absolute;
    left: 0;
    transform: translateX(-50%);
  }

  .circle-red {
    border: 2px solid var(--red-light);
  }

  .circle-green {
    border: 2px solid var(--green-light);
  }

  .task-text {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .task-text > p {
    margin: 0;
    color: var(--gray-2);
  }

  @media screen and (max-width: 768px) {
    .description-hidden {
      display: none;
    }
  }
`;
