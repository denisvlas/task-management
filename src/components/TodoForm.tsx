import React, { useState } from 'react'
import {Todo} from '../models'


interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoForm:React.FC<Props> = ({todo,setTodo}) => {

    const [inputValue,setInputValue]=useState('')

function saveValue(){
    setInputValue(inputValue)
    let todos=[...todo,{id:todo.length+1,title:inputValue,status:false,}]
    
    setTodo(todos)
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

