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

  const project = projects.find((p) => p.name === projectName);

  async function regUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (username.length < 3) {
      setWarning("Username must be more than 3 characters");
      return;
    }
    if (password.length < 3) {
      setWarning("Password must be more than 3 characters");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/reg", {
        username: username,
        password: password,
        projectId: project?.projects_id,
      });

      if (response.data.warning) {
        setWarning(response.data.warning);
        return;
      }
      const res = await axios.get(
        `http://localhost:3001/get-user-id/${username}/${project?.projects_id}`
      );
      const id = res.data.userId;
      navigate(`/tasks/${projectName}/${username}/${id}`);

      setPassword("");
      setUsername("");
    } catch (error) {
      console.error(error);
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
