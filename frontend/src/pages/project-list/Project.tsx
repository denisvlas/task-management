import { url } from 'inspector'
import React from 'react'
import { Link } from 'react-router-dom'
import { ProjectType } from '../../models' 

interface Props{
    project:ProjectType
}

const Project:React.FC<Props> = ({project}) => {

  return (
<Link className='project-link' key={project.projects_id} to={`/login/${project.name}`}>
  <div className='project'>

    <img className='project-img' src={project.img} alt="" />
    {project.name}
  </div>
</Link>
   
  )
}

export default Project