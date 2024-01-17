import axios from "axios";
import { useState, useEffect } from "react";
import { ProjectType, Todo, User } from "../models";
import { updateTask } from "./Main";

interface Props {
  project: ProjectType;
  modal: Todo;
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
}

export const UserList: React.FC<Props> = ({
  modal,
  todo,
  setTodo,
  setShowMembers,
  project,
  users,
  setUsers,
}) => {
  function attachUser(id: number, userId: number) {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.user_id = userId;
        updateTask(item, id);
      }

      return item;
    });

    setShowMembers(false);
    setTodo(newTodo);
    localStorage.setItem("tasks", JSON.stringify(todo));
  }

  function unAttachUser(id: number) {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.user_id = null;
        updateTask(item, id);
      }
      return item;
    });

    setTodo(newTodo);
  }
  return (
    <div className="users">
      {users.length > 0 ? (
        <div className="users">
          <p onClick={() => unAttachUser(modal.id)} className="user-null">
            ------null------
          </p>
          {users.map((user) => {
            return (
              user.role != "admin" && (
                <p
                  onClick={() => attachUser(modal.id, user.id)}
                  key={user.id}
                  className="user"
                >
                  {user.username}
                </p>
              )
            );
          })}{" "}
        </div>
      ) : (
        <p className="user">no users</p>
      )}
    </div>
  );
};
