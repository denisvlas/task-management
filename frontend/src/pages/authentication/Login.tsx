import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProjectType } from '../../models';



interface props{
  projects:ProjectType[]
}


const Login: React.FC<props> = ({projects}) => {
  const { projectName } = useParams();
  const p = projects.find(p => p.name === projectName);
  console.log(p)
  const [project, setProject] = useState<ProjectType | undefined>(p);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [warning, setWarning] = useState('');
  const navigate=useNavigate()


  useEffect(() => {
    if (project) {
      localStorage.setItem('project', JSON.stringify(project));
    }
  }, [project]);

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject) {
      setProject(JSON.parse(storedProject));
    }
  }, []);
  async function loginUser(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: username,
        password: password,
        projectId:project?.projects_id
      });

      if (response.data.length > 0) {
        // Utilizatorul a fost autentificat cu succes
        console.log('Utilizator autentificat:', response.data);
        navigate(`/${projectName}/${username}`)
        // Aici poți face orice dorești cu datele utilizatorului autentificat
      } else {
        setWarning('Wrong username or password');
      }
    } catch (error) {
      console.error(error);
    }

    setPassword('');
    setUsername('');
  }

  return (
    <div className='auth'>
      <h2>Log in</h2>
      <img className='project-img-reg' src={project?.img} alt={project?.name} />
      <h1 className='reg-title'> {project?.name}</h1>
      <form className='reg-form'>
        <label htmlFor='username-label'>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='enter your username '
          className='register-username'
          type='text'
        />
        <label htmlFor='password-label'>password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='enter your password'
          type='password'
        />
        <div className='footer-auth'>
          {warning && <p className='reg-warning'>{warning}</p>}
          <div className='footer-auth-btn'>
            <Link to={`/reg/${projectName}`}>
              <div className='have-account'>i don't have an account</div>
            </Link>
            <button className='signup-btn' onClick={(e) => loginUser(e)}>
              log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
