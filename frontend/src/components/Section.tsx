import React from "react";
import { Todo, TodoStatusType, User } from "../models";
import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { Task } from "./Task";
import { updateTask } from "./Main";
interface Props {
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
  status: TodoStatusType;
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
      return mTasks as Todo[];
    });
  }

  let tasksToMap = todos;

  if (status === "progress") {
    tasksToMap = inProgress;
  }
  if (status === "done") {
    tasksToMap = done;
  }


  return (
    <div style={{ margin: "4px" }} className="section ">
      <div ref={drop} className={`todo-task-wrapper ${isOver && "onOver"}`}>
        <Header status={status} count={tasksToMap.length}  />
        {tasksToMap.map((item) => (
          <Task item={item}
            userRole={userRole}
            userId={userId}
            users={users}
            modal={modal}
            setModal={setModal}
            status={status}
            key={item.id}
            todo={todo}
            setTodo={setTodo}
          />
        ))}
      </div>
    </div>
  );
};



