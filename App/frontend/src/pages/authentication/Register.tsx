import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectType } from "../../models";
import { useMutation, useQuery } from "urql";
import { getUsers, registerUser, getUserId } from "../../graphql/queries";

interface Props {
  projects: ProjectType[];
}
interface UserIdResult {
  users: { id: number }[];
}

const Register: React.FC<Props> = ({ projects }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [project, setProject] = useState<ProjectType | undefined>();

  // Find project based on route param
  useEffect(() => {
    if (!projects || !projectName) {
      console.log("No projects or projectName available");
      return;
    }

    const currentProject = projects.find((p) => p.name === projectName);
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

  // Query to check if user already exists
  const [isRegisteredResult] = useQuery({
    query: getUsers,
    variables: {
      userName: username.trim(),
      project_id: project?.project_id,
    },
    pause: !username || !project?.project_id, // Don't run query until we have both values
  });

  // Set up registration mutation
  const [registerResult, executeRegister] = useMutation(registerUser);

  // Set up the getUserId query with client to allow execution later
  const [_, fetchUserIdFunction] = useQuery<UserIdResult>({
    query: getUserId,
    variables: {
      username: username.trim(),
      projectId: project?.project_id,
    },
    pause: true, // Don't execute this query automatically
  });

  async function regUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // Input validation
    if (!project || !project.project_id) {
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

    // Check if user exists
    if (
      isRegisteredResult.data?.users &&
      isRegisteredResult.data.users.length > 0
    ) {
      setWarning("A user with this username already exists in this project.");
      return;
    }

    // Register the user using GraphQL mutation
    try {
      const variables = {
        username: username.trim(),
        password: password,
        projectId: project.project_id,
      };

      const result = await executeRegister(variables);
      
      if (result.error) {
        console.error("Registration error:", result.error);
        setWarning("Registration failed. Please try again.");
        return;
      }

      if (result.data?.insert_users?.affected_rows > 0) {
        console.log("User registered successfully");
        try {
         const userId=result.data.insert_users.returning[0].id;
         const username=result.data.insert_users.returning[0].username;
         console.log(`/tasks/${project.name}/${username}/${userId}`);
         
         navigate(`/tasks/${project.name}/${username}/${userId}`);
         
        } catch (error) {
          console.error("Error fetching user ID:", error);
          setWarning("Registration successful but failed to retrieve user ID.");
        }
      } else {
        setWarning("Registration failed. Please try again.");
      }
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
            <button
              className="signup-btn"
              onClick={(e) => regUser(e)}
              disabled={registerResult.fetching}
            >
              {registerResult.fetching ? "Registering..." : "Sign up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
