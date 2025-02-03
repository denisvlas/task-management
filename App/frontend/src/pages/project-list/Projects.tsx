import React, { useState } from "react";
import Project from "./Project";
import "./project-list.css";
import axios from "axios";
import { ProjectType } from "../../models";

interface Props {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

export const Projects: React.FC<Props> = ({ projects, setProjects }) => {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function addProject() {
    setShowInput(false);
    axios.post("http://localhost:3001/add-project", {
      name: name,
      url: url,
    });
    setProjects([
      ...projects,
      { project_id: projects.length + 1, name: name, img: url },
    ]);
    setName("");
    setUrl("");
  }

  return (
    <div className="projects-page">
      <h1 className="title">PROJECTS</h1>

      <i
        onClick={() => setShowInput(!showInput)}
        className="bi bi-plus-circle add-icon"
      ></i>
      {showInput ? (
        <div className="modal-form">
          <form>
            <h3>Add a project</h3>
            <label htmlFor="Project name">Project name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Write the name of project"
            />
            <label htmlFor="Image url">Project logo url</label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="Add the link for image"
            />
          </form>
          <button onClick={() => addProject()}>add</button>
        </div>
      ) : (
        <></>
      )}
      {projects.length > 0 ? (
        <div>
          <div className="projects-list-wrapper">
            {projects.length > 0 &&
              projects.map((project) => (
                <Project key={project.name} project={project} />
              ))}
          </div>
        </div>
      ) : (
        <h1 className="no-projects">no projects yet</h1>
      )}
    </div>
  );
};
