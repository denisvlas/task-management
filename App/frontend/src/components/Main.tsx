import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { ProjectType, Todo, User } from "../models";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ListTask } from "./ListTask";
import Footer from "./Footer";
import PopUp from "./PopUp";
import { ProgressBar } from "./ProgressBar";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import NotFound from "../pages/NotFound";
import axios from "axios";

function Main({ projects }: { projects: ProjectType[] }) {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [modal, setModal] = useState<Todo | null>(null);
  const { projectName, username, userId } = useParams();
  const [project, setProject] = useState<ProjectType>();

  useEffect(() => {
    const p = projects.find((p) => p.name === projectName);
    if (p !== undefined) {
      localStorage.setItem("project", JSON.stringify(p));
    }
    const storedProject = localStorage.getItem("project");
    if (storedProject) {
      setProject(JSON.parse(storedProject));
    }
    if (project !== undefined) {
      fetchTasks();
      fetchUsers();
    }
  }, [project?.project_id]);

  const [users, setUsers] = useState<User[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  useEffect(() => {
    if (userId && users.length > 0) {
      const user = users.find((user) => user.id === parseInt(userId));
      setUserRole(user?.role || "nu s-a gasit user role");
    }
  }, [userId, users]);

  async function fetchUsers() {
    try {
      const res = await axios.get(
        `http://localhost:3001/users/${project?.project_id}`
      );
      setUsers(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function fetchTasks() {
    try {
      if (project !== undefined) {
        const res = await axios.get(
          `http://localhost:3001/tasks/${project?.project_id}`
        );

        setTodo(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const [showAside, setShowAside] = useState(false);
  const navigate = useNavigate();
  function exit() {
    navigate("/projects");
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (!users.find((user) => user.username === username)) {
    return <NotFound />;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className={`${scrolled && "header-scroll"} app-header`}>
          <div className="project-info">
            <img className="main-img" src={project?.img} alt="" />
            <h1>{project?.name}</h1>
          </div>

          <div
            onClick={() => setShowAside(!showAside)}
            className="user-info-btn"
          >
            <i className="bi bi-person user-icon"></i>
            <h3 className="hello-user">{username}</h3>
          </div>
          {showAside && (
            <div className="user-aside">
              <div onClick={() => exit()} className="exit-section">
                <i className="bi bi-box-arrow-left exit-icon"></i>
                <p>exit</p>
              </div>
            </div>
          )}
        </header>
        <div className="main">
          {modal && (
            <PopUp
              userRole={userRole}
              userId={userId}
              setUsers={setUsers}
              users={users}
              project={project}
              todo={todo}
              setTodo={setTodo}
              modal={modal}
              setModal={setModal}
            />
          )}
          {userRole === "admin" && (
            <TodoForm
              userId={userId}
              project={project}
              todo={todo}
              setTodo={setTodo}
            />
          )}

          {userRole === "admin" && (
            <Footer project={project} todo={todo} setTodo={setTodo} />
          )}
          <ProgressBar todo={todo} setTodo={setTodo} />
          <ListTask
            userRole={userRole}
            userId={userId}
            setUsers={setUsers}
            users={users}
            modal={modal}
            setModal={setModal}
            todo={todo}
            setTodo={setTodo}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default Main;

export async function updateTask(updatedData: Todo, taskId: number) {
  try {
    const response = await axios.put(
      `http://localhost:3001/update-task/${taskId}`,
      {
        title: updatedData.title,
        status: updatedData.status,
        description: updatedData.description,
        comment: updatedData.comment,
        userId: updatedData.user_id,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
