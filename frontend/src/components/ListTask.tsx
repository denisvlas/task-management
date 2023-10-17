import React, { useState, useEffect } from "react";
import { Todo, TodoStatusType, User } from "../models";
import { Section } from "./Section";
import { useDrop } from "react-dnd";

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
  userId: string | undefined;
  userRole: string;
}

export const ListTask: React.FC<Props> = ({
  todo,
  setTodo,
  modal,
  setModal,
  setUsers,
  users,
  userId,
  userRole,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inProgress, setInProgress] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);

  const [statuses, setStatuses] = useState<TodoStatusType[]>([
    TodoStatusType.incompleted,
    TodoStatusType.progress,
    TodoStatusType.done,
  ]);

  useEffect(() => {
    const fTodos = todo.filter(
      (task) => task.status === TodoStatusType.incompleted
    );
    setTodos(fTodos);
    const fInProgress = todo.filter(
      (task) => task.status === TodoStatusType.progress
    );
    setInProgress(fInProgress);
    const fDone = todo.filter((task) => task.status === TodoStatusType.done);
    setDone(fDone);
  }, [todo]);

  return (
    <div className="task-list">
      <div className="statuses">
        {statuses.map((status, index) => (
          <Section
            userRole={userRole}
            userId={userId}
            users={users}
            modal={modal}
            setModal={setModal}
            key={index}
            index={index}
            status={status}
            todo={todo}
            setTodo={setTodo}
            todos={todos}
            inProgress={inProgress}
            done={done}
          />
        ))}
      </div>
    </div>
  );
};
