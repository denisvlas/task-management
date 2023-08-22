import React from 'react'
import TodoTask from './TodoTask'
import {Todo} from '../models'

interface Props{
        todo:Todo[]
        setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
    }
    
 const TaskList:React.FC<Props>=({todo,setTodo})=> {

    
  return (
    <div>
        <TodoTask  todo={todo} setTodo={setTodo}/>
    </div>
  )
}

export default TaskList
