import React, { useState } from "react";
import { ProjectType, Todo, TodoStatusType } from "../models";
import axios from "axios";

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  project: ProjectType | undefined;
}

const Footer: React.FC<Props> = ({ todo, setTodo, project }) => {
  async function clear() {
    try {
      await axios.delete(
        `http://localhost:3001/delete-all/${project?.project_id}`
      );
      setTodo([]);
      localStorage.setItem("tasks", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  }

  const [completed, setCompleted] = useState(0);

  const initialCompletedCount = todo.filter(
    (item) => item.status === TodoStatusType.done
  ).length;
  if (initialCompletedCount !== completed) {
    setCompleted(initialCompletedCount);
  }

  function deleteSelected() {
    let todos = todo.filter((item) => {
      if (item.status !== TodoStatusType.done) return item;
    });
    setTodo(todos);
  }

  return (
    <div>
      {todo.length > 1 ? (
        <div className="footer">
          <span className="counter">
            |{todo.length} tasks | completed {completed} |
          </span>
          <button className="clear-all" onClick={() => clear()}>
            clear all
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Footer;
