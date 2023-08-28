import React from 'react'
import TodoTask from './TodoTask'
import {Todo} from '../models'

interface Props{
        todo:Todo[]
        setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
        taskCount:number
        setTaskCount:React.Dispatch<React.SetStateAction<number>>
    }
    
 const TaskList:React.FC<Props>=({todo,setTodo,taskCount,setTaskCount})=> {

    
  return (
    <div>
        <TodoTask  todo={todo} setTodo={setTodo} taskCount={taskCount} setTaskCount={setTaskCount}/>
    </div>
  )
}

export default TaskList
