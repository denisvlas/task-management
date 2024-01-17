import 'bootstrap-icons/font/bootstrap-icons.css';
import Main from './components/Main';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import { Projects } from './pages/project-list/Projects';
import { ProjectType } from './models';
import {useState,useEffect} from 'react'
import axios from 'axios'
import NotFound from './pages/NotFound';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [projects,setProjects]=useState<ProjectType[]>([])

  useEffect(()=>{
    axios.get('http://localhost:3001/projects').then(res=>{
     setProjects(res.data)
    }).catch(e=>console.log(e))
  
},[])


return (
<BrowserRouter>
<DndProvider backend={HTML5Backend}>

  <Routes>
  <Route path="/not-found" element={<NotFound />} />
  <Route path='/reg/:projectName' element={<Register projects={projects} />} />
  <Route path='/tasks/:projectName/:username/:userId'  element={<Main  projects={projects}/>}/>
  <Route path='/login/:projectName' element={<Login projects={projects}/>}/>
  <Route path='/projects' element={<Projects projects={projects} setProjects={setProjects}/>}/>
  <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Routes>
  </DndProvider>
  </BrowserRouter> 
    
  );
}

export default App;



