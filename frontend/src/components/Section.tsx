import React from "react";
import { Todo, TodoStatusType, User } from "../models";
import { useDrag, useDrop } from "react-dnd";
import { Header } from "./Header";
import { Task, updateTask } from "./Task";

interface Props {
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
  status: string;
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  inProgress: Todo[];
  done: Todo[];
  users: User[];
  userId: string | undefined;
  userRole: string;
  index: number;
}

export const Section = ({
  index,
  modal,
  setModal,
  status,
  todo,
  todos,
  inProgress,
  done,
  setTodo,
  users,
  userId,
  userRole,
}: Props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Todo) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItemToSection(id: number) {
    setTodo((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          const newItem = { ...t, status: status };

          updateTask(newItem, t.id);
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      return mTasks as Todo[];
    });
  }

  let bg = "white";
  let tasksToMap = todos;

  if (status === "progress") {
    bg = "orange";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    bg = "green";
    tasksToMap = done;
  }

  const [, ref] = useDrag({
    type: "section",
  });

  return (
    <div style={{ margin: "4px" }} className="section ">
      <div ref={drop} className={`todo-task-wrapper ${isOver && "onOver"}`}>
        <Header status={status} count={tasksToMap.length} bg={bg} />
        {tasksToMap.map((item) => (
          <Task
            userRole={userRole}
            userId={userId}
            users={users}
            modal={modal}
            setModal={setModal}
            status={status}
            bg={bg}
            key={item.id}
            todo={todo}
            setTodo={setTodo}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

interface Props {
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
  status: string;
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  inProgress: Todo[];
  done: Todo[];
  users: User[];
  userId: string | undefined;
  userRole: string;
  index: number;
}

export const List = ({
  index,
  modal,
  setModal,
  status,
  todo,
  todos,
  inProgress,
  done,
  setTodo,
  users,
  userId,
  userRole,
}: Props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Todo) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItemToSection(id: number) {
    setTodo((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          const newItem = { ...t, status: status };

          updateTask(newItem, t.id);
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      return mTasks as Todo[];
    });
  }

  let bg = "white";
  let tasksToMap = todos;

  if (status === "progress") {
    bg = "orange";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    bg = "green";
    tasksToMap = done;
  }

  return (
    <div style={{ margin: "4px" }} className="list ">
      <div ref={drop} className={`todo-task-wrapper ${isOver && "onOver"}`}>
        <Header status={status} count={tasksToMap.length} bg={bg} />
        {tasksToMap.map((item) => (
          <Task
            userRole={userRole}
            userId={userId}
            users={users}
            modal={modal}
            setModal={setModal}
            status={status}
            bg={bg}
            key={item.id}
            todo={todo}
            setTodo={setTodo}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
