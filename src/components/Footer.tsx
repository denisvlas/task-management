import React,{useState} from 'react'
import { Todo } from '../models'

interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}

const Footer:React.FC<Props>= ({todo,setTodo}) => {
    function clear(){
        setTodo([])
    }
    
    const[completed,setCompleted]=useState(0)
    
    
    const initialCompletedCount = todo.filter(item => item.status).length;
      if (initialCompletedCount !== completed) {
        setCompleted(initialCompletedCount);
      }
            
      function deleteSelected(){
        let todos=todo.filter(item=>{
        if(!item.status)    
           return item
        })
        setTodo(todos)
    }
    
    const [originalTodo,setOriginalTodo] = useState(todo)
    
    
    function showIncompleteTasks(){
      const incomplete=todo.filter(item=>{
        if(!item.status)
        return item
      })
      setTodo(incomplete)
      
    }
    
    function showCompleteTasks(){
      const complete=todo.filter(item=>item.status)
      setTodo(complete)
    }
    
    function showAll(){
      setTodo(originalTodo)
    }
    
    
    
      return (
        <div>
    
            {todo.length>1? 
            <div className='footer'>
                <span className='counter'>
                    |{todo.length} tasks | completed {completed} |
                 </span>
            <button className='clear-all' onClick={()=>clear()}>clear all</button></div>:
            <div></div>}
            {completed>0&&<button className='delete-completed' onClick={()=>deleteSelected()}>delete completed</button>
    }   
      {todo.length>0?<div className='footer-btn'>
            <button className='show-incomplete' onClick={()=>showIncompleteTasks()}>
              Show Incomplete Tasks
            </button>
            <button className='show-complete' onClick={()=>showCompleteTasks()}>
              Show complete Tasks
            </button>
            <button className='show-all-tasks' onClick={()=>showAll()}>
              Show all Tasks
            </button>
        </div>: ''}
    
        
        </div>
      )
    }
    

export default Footer