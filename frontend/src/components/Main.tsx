import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { ProjectType, Todo, TodoStatusType } from "../models";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ListTask } from "./ListTask";
import Footer from "./Footer";
import PopUp from "./PopUp";
import { ProgressBar } from "./ProgressBar";
import { Navigate, Route, useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

export const statuses = [
  TodoStatusType.incompleted,
  TodoStatusType.progress,
  TodoStatusType.done,
];

function Main({ projects }: { projects: ProjectType[] }) {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [modal, setModal] = useState<Todo | null>(null);
  const { projectName, username } = useParams();
  const p = projects.find((p) => p.name === projectName);
  const [project, setProject] = useState<ProjectType | undefined>(p);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTodo(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    if (project) {
      localStorage.setItem("project", JSON.stringify(project));
    }
  }, [project]);
  useEffect(() => {
    const storedProject = localStorage.getItem("project");
    if (storedProject) {
      setProject(JSON.parse(storedProject));
    }
  }, []);

  const [showAside, setShowAside] = useState(false);
  const navigate = useNavigate();
function exit(){
  navigate('/projects')
}
  if (!p) {
    return <NotFound />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="app-header">
          <div className="project-info">
            <img className="main-img" src={project?.img} alt="" />
            <h1>{project?.name}</h1>
          </div>

          <div
            onClick={() => setShowAside(!showAside)}
            className="user-info-btn"
          >
            <i className="bi bi-person user-icon"></i>
            <h3 className="hello-user">hello, {username}</h3>
          </div>
          {showAside && (
            <div className="user-aside">
              <div onClick={()=>exit()} className="exit-section">
                <i className="bi bi-box-arrow-left exit-icon"></i>
                <p>exit</p>
              </div>
            </div>
          )}
        </header>
        <div className="main">
          {modal && (
            <PopUp
              todo={todo}
              setTodo={setTodo}
              modal={modal}
              setModal={setModal}
            />
          )}
          <TodoForm todo={todo} setTodo={setTodo} />
          <Footer todo={todo} setTodo={setTodo} />
          <ProgressBar todo={todo} setTodo={setTodo} />
          <ListTask
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
