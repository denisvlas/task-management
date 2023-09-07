import React, { useState } from 'react'
import {Todo, TodoStatusType} from '../models'


interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}



const TodoForm:React.FC<Props> = ({todo,setTodo}) => {

  const [task,setTask]=useState<Todo>({
    id:0,
   title:'',
   status:TodoStatusType.incompleted
  })
function saveValue(){
   
  setTodo(prev=>{
    const list=[...prev,task]
    localStorage.setItem('tasks',JSON.stringify(list))
    return list
})
  setTask({
    id:0,
    title:'',
    status:TodoStatusType.incompleted
  })
}
function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    saveValue();
  }
}
  return (
   
    <div className='add-task-section'>
          
          <input placeholder='I have to...' type="text" value={task.title} onKeyPress={handleKeyPress} onChange={(e)=>setTask({...task,id:todo.length+1,title:e.target.value})} />
          <button onClick={()=>saveValue()} className='add-task-btn'>add</button>
    </div>
   
  )
}

export default TodoForm

