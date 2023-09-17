import React, { useState, useEffect } from "react";
import { Todo, TodoStatusType } from "../models";
import { statuses } from "./Main";
import { Section } from "./Section";

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const ListTask: React.FC<Props> = ({
  todo,
  setTodo,
  modal,
  setModal,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inProgress, setInProgress] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);

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
      {statuses.map((status, index) => (
        <Section
          modal={modal}
          setModal={setModal}
          key={index}
          status={status}
          todo={todo}
          setTodo={setTodo}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};
