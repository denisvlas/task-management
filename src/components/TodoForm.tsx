import React, { useState,useEffect } from 'react'
import {Todo} from '../models'
import axios from 'axios'; 

interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
    setTaskCount:React.Dispatch<React.SetStateAction<number>>
}

const TodoForm:React.FC<Props> = ({todo,setTodo,setTaskCount}) => {

    const [inputValue,setInputValue]=useState('')


    

const saveValue=()=>{

    axios.post('http://localhost:3001/api/insert',{
          id:todo.length+1,
          task:inputValue,
          status:false,
        })
    setTodo([...todo,{id:todo.length+1,task:inputValue,status:false}])
    setTaskCount(todo.length+1)

    setInputValue('')
   
}



function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    saveValue();
  }
}
  return (
    <div className='add-task-section'>
          <input placeholder='I have to...'onKeyPress={handleKeyPress} value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
          <button className='add-task-btn'onClick={()=>saveValue()} >add</button>
    </div>
  )
}

export default TodoForm

