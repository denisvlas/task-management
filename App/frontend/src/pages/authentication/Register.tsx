import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProjectType } from "../../models";

interface Props {
  projects: ProjectType[];
}

const Register: React.FC<Props> = ({ projects }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [project, setProject] = useState<ProjectType | undefined>();

  useEffect(() => {
    if (!projects || !projectName) {
      console.log("No projects or projectName available");
      return;
    }

    const currentProject = projects.find((p) => p.name === projectName);
    console.log("Found project:", currentProject);
    
    if (!currentProject) {
      setWarning("Project not found");
      return;
    }
    
    if (!currentProject.project_id) {
      console.error("Project found but no ID:", currentProject);
      setWarning("Invalid project configuration");
      return;
    }

    setProject(currentProject);
  }, [projects, projectName]);

  async function regUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    
    if (!project || !project.project_id) {
      console.error("Missing project or project ID:", project);
      setWarning("Project configuration error");
      return;
    }

    if (username.length < 3) {
      setWarning("Username must be more than 3 characters");
      return;
    }
    if (password.length < 3) {
      setWarning("Password must be more than 3 characters");
      return;
    }

    try {
      console.log("Attempting registration with:", {
        username: username.trim(),
        projectId: project.project_id
      });

      const response = await axios.post("http://localhost:3001/reg", {
        username: username.trim(),
        password: password,
        projectId: project.project_id
      });

      if (response.data.warning) {
        setWarning(response.data.warning);
        return;
      }

      const res = await axios.get(
        `http://localhost:3001/get-user-id/${username.trim()}/${project.project_id}`
      );
      
      if (!res.data.userId) {
        setWarning("Failed to get user ID");
        return;
      }

      navigate(`/tasks/${projectName}/${username}/${res.data.userId}`);
      setPassword("");
      setUsername("");
    } catch (error) {
      console.error("Registration error:", error);
      setWarning("Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth">
      <h2>Sign up</h2>
      <img className="project-img-reg" src={project?.img} alt={project?.name} />
      <h1 className="reg-title"> {project?.name}</h1>
      <form className="reg-form">
        <label htmlFor="username-label">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="register-username"
          type="text"
        />
        <label htmlFor="password-label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
        />
        <div className="footer-auth">
          {warning && <p className="reg-warning">{warning}</p>}
          <div className="footer-auth-btn">
            <Link to={`/login/${project?.name}`}>
              <div className="have-account">Already have an account</div>
            </Link>
            <button className="signup-btn" onClick={(e) => regUser(e)}>
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
