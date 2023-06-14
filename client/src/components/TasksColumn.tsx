import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { removeTask, updateTask } from "../features/tasks/tasksSlice";
import { useDispatch } from "react-redux";

const TasksColumn = ({
  title,
  tasks,
  id,
  completed,
}: {
  title?: string;
  tasks: any;
  id?: number;
  completed?: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper className={title}>
      <h4 className="column-title">{title}</h4>
      {tasks.length > 0 ? (
        tasks.map((task: any, index: number) => {
          return (
            <article
              className={completed ? "task completed" : "task undone"}
              key={index}
            >
              <div
                className="circle circle-red"
                style={{ backgroundColor: task.color || "black" }}
              ></div>
              <div className="task-text">
                <h5 className="name">
                  {task.name.length > 10
                    ? task.name.slice(0, 10) + "..."
                    : task.name}
                </h5>
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
    </Wrapper>
  );
};
export default TasksColumn;

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  .column-title {
    text-transform: capitalize;
    margin: 0;
    color: var(--gray-2);
    margin-bottom: 0.3rem;
  }

  hr {
    bottom: 0;
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    right: 0;
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
`;
