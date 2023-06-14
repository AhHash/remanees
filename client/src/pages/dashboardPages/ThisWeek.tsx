import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Overlay from "../../components/Overlay";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { removeTask, updateTask } from "../../features/tasks/tasksSlice";
import TasksColumn from "../../components/TasksColumn";

const ThisWeek = () => {
  const tasks = useSelector((store) => (store as any).tasks);
  console.log(tasks);

  const [add, setAdd] = useState(false);

  const { thisWeek } = tasks;

  const days = thisWeek.reduce(
    (total: any, current: any) => {
      switch (new Date(current.lastUpdated).getDay()) {
        case 0:
          total.sunday.push(current);
          break;
        case 1:
          total.monday.push(current);
          break;
        case 2:
          total.tuesday.push(current);
          break;
        case 3:
          total.wednesday.push(current);
          break;
        case 4:
          total.thursday.push(current);
          break;
        case 5:
          total.friday.push(current);
          break;
        case 6:
          total.saturday.push(current);
          break;
      }
      return total;
    },
    {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    }
  );

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
        <div className="days">
          {Object.keys(days).map((day: any, index) => {
            return <TasksColumn title={day} tasks={days[day]} id={index} />;
          })}
          <hr />
        </div>
        <h3 className="title">Past</h3>
        <TasksColumn tasks={tasks.past} />
        <h3 className="title">Completed</h3>
        <TasksColumn completed={true} tasks={tasks.completed} />
      </div>
    </Wrapper>
  );
};

export default ThisWeek;

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

  .overlay-hidden {
    display: none;
  }

  .container {
    padding: 0 1.5rem;
  }

  @media screen and (max-width: 1070px) {
    .description-hidden {
      display: none;
    }
  }

  .days {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 1rem;
  }

  .saturday {
    grid-column: span 2;
    margin-bottom: -1rem;
  }

  @media screen and (min-width: 1070px) {
    .days {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      column-gap: 1.5rem;
    }

    .saturday {
      grid-column: span 3;
    }
  }
`;
