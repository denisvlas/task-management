import React, { useEffect, useState } from "react";
import Project from "./Project";
import "./project-list.css";
import { ProjectType } from "../../models";
import { addProject, getProjects } from "../../graphql/queries";
import { useQuery, useMutation } from 'urql';

interface Props {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}


export const Projects: React.FC<Props> = ({ projects, setProjects }) => {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // const [result] = useQuery({
  //   query: getProjects,
  // });
  // const { data, fetching, error } = result;

  // useEffect(() => {
  //   if (data?.projects) {
  //     setProjects(data.projects);
  //   }
  //   console.log(projects);
  // }, [data, projects]);

  // const [addProjectResult, addProjectMutation] = useMutation(addProject);

  // function AddProject() {
  //   if (name && url) {
  //     addProjectMutation({ name, img: url }).then((result) => {
  //       console.log(result.data)
        
  //       if (result.data?.insert_projects_one) {
  //         setProjects([...projects, result.data.insert_projects_one]);
  //         setShowInput(false);
  //         setName("");
  //         setUrl("");
  //       }
  //     }).catch((e) => console.log(e));
  //   }
  // }

  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
function AddProject() {
  
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
          <button onClick={AddProject}>add</button>
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
