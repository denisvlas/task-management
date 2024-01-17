import React from "react";
import { Todo, TodoStatusType } from "../models";

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const ProgressBar: React.FC<Props> = ({ todo, setTodo }) => {
  const doneLen = todo.filter((item) => item.status === TodoStatusType.done);
  const progres = doneLen.length
    ? `${((doneLen.length / todo.length) * 100).toFixed()}%`
    : "0%";

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: progres }}></div>
      {doneLen.length > 0 ? (
        <span className="ppp" style={{ margin: 10 }}>
          progress: {progres}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
