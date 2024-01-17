import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProjectType } from "../../models";

interface props {
  projects: ProjectType[];
}

const Login: React.FC<props> = ({ projects }) => {
 
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const { projectName } = useParams();
  const p = projects.find((p) => p.name === projectName);
  const [project, setProject] = useState<ProjectType>();
  useEffect(() => {
    p && setProject(p);
  }, [p]);

  async function loginUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
        projectId: project?.projects_id,
      });

      if (response.data.length > 0) {
        try {
          const res = await axios.get(
            `http://localhost:3001/get-user-id/${username}/${project?.projects_id}`
          );
          const id = res.data.userId;
          navigate(`/tasks/${projectName}/${username}/${id}`);
        } catch (err) {
          console.error(err);
        }
      } else {
        setWarning("Wrong username or password");
      }
    } catch (error) {
      console.error(error);
    }

    setPassword("");
    setUsername("");
  }

  return (
    <div className="auth">
      <h2>Log in</h2>
      <img className="project-img-reg" src={project?.img} alt={project?.name} />
      <h1 className="reg-title"> {project?.name}</h1>
      <form className="reg-form">
        <label htmlFor="username-label">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username "
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
            <Link to={`/reg/${projectName}`}>
              <div className="have-account">i don't have an account</div>
            </Link>
            <button className="signup-btn" onClick={(e) => loginUser(e)}>
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
