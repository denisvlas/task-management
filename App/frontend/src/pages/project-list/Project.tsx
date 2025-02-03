import React, { useState, useEffect } from "react";
import { ProjectType } from "../../models";
import axios from "axios";

interface Props {
  project: ProjectType;
}

const Project: React.FC<Props> = ({ project }) => {
  const [tasksLength, setTasksLength] = useState(0);
  const [membersLength, setMembersLength] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  async function fetchTasks() {
    try {
      const res = await axios.get(
        `http://localhost:3001/tasks/${project?.project_id}`
      );

      setTasksLength(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUsers() {
    try {
      const res = await axios.get(
        `http://localhost:3001/users/${project?.project_id}`
      );
      setMembersLength(res.data.length);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="project-link" key={project.project_id}>
      <div className="project-header">
        <img className="project-img" src={project.img} alt="" />
        {project.name}
      </div>
      <i className="bi bi-list-task tasks-length">
        {" "}
        tasks in project: {tasksLength}
      </i>
      <i className="bi bi-people members-length">
        {" "}
        members in project: {membersLength}
      </i>
      <div className="join-project">
        <a href={`/login/${project.name}`}>Join</a>
      </div>
    </div>
  );
};

export default Project;
