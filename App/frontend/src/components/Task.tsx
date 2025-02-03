import React, {  useState } from "react";
import { useDrag } from "react-dnd";
import { Todo, User } from "../models";
import axios from "axios";
import { updateTask } from "./Main";

interface Props {
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>;
  status: string;
  item: Todo;
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  users: User[];
  userId: string | undefined;
  userRole: string;
}

export const Task = ({
  modal,
  setModal,
  item,
  todo,
  setTodo,
  status,
  users,
  userId,
  userRole,
}: Props) => {
  async function deleteTodo(id: number) {
    try {
      await axios.delete(`http://localhost:3001/delete-task/${id}`);
      setShowMore(false);
      let newTodo = [...todo].filter((item) => item.id !== id);
      setTodo(newTodo);
    } catch (e) {
      console.log(e);
    }
  }

  const [edit, setEdit] = useState<null | number>(null);
  const [inputValue, setInputValue] = useState("");

  function saveValue(id: number) {
    setShowMore(false);
    setEdit(null);
    let todos = [...todo].map((item) => {
      if (item.id === id) {
        item.title = inputValue;
        updateTask(item, item.id);
      }
      return item;
    });
    setTodo(todos);
    setInputValue("");
    setEdit(null);
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function cancelEdit() {
    setEdit(null);
  }

  const [showMore, setShowMore] = useState<boolean>(false);

  const attachedUser = users.find((user) => user.id === item.user_id);

  function popUp(item: Todo) {
    (attachedUser &&
      userId &&
      attachedUser.id === parseInt(userId) &&
      setModal(item)) ||
      (userRole === "admin" && setModal(item));
  }

  return (
    <div
      ref={
        (attachedUser &&
          userId &&
          attachedUser.id === parseInt(userId) &&
          drag) ||
        (userRole === "admin" && drag) ||
        null
      }
      onMouseLeave={() => setShowMore(false)}
      className={`${
        status === "to-do"
          ? "to-do"
          : status === "progress"
          ? "progress"
          : status === "done" && "done"
      } ${isDragging && "dragging"} ${
        attachedUser && userId && attachedUser.id === parseInt(userId)
          ? "my-task"
          : userRole === "admin" && "grab"
      } todo-item `}
    >
      <div className="todo-task">
        {edit === item.id ? (
          <div className="edit-form">
            <div>
              <input
                placeholder="I have to..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="edit-btn">
              <button
                className="apply-task-btn"
                onClick={() => saveValue(item.id)}
              >
                apply
              </button>
              <button className="apply-task-btn" onClick={() => cancelEdit()}>
                exit
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-task">
            <div onClick={() => popUp(item)} className="todo-task-click">
              <p className="item-title">{item.title}</p>
              {attachedUser && userId ? (
                <p
                  className={`${
                    attachedUser.id === parseInt(userId)
                      ? `my-item-indicator`
                      : "not-my-item-indicator"
                  } item-attached`}
                >
                  <i className="bi bi-pin-angle"></i> {attachedUser.username}
                </p>
              ) : (
                <></>
              )}
            </div>
            {userRole === "admin" && (
              <i
                onClick={() => setShowMore(!showMore)}
                className="bi bi-three-dots-vertical show-more-btn"
              ></i>
            )}
            {showMore && (
              <div
                onMouseEnter={() => setShowMore(true)}
                onMouseLeave={() => setShowMore(false)}
                className="more-btn"
              >
                <span onClick={() => deleteTodo(item.id)}>delete</span>
                <span onClick={() => setEdit(item.id)}>edit</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
