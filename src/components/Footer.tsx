import React,{useState} from 'react'
import { Todo } from '../models'
import axios from 'axios'; 

interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
    taskCount:number
}

const Footer:React.FC<Props>= ({todo,setTodo,taskCount}) => {


    function clear(){
      axios.delete('http://localhost:3001/api/delete-all')
      .then(response => {
          console.log(response.data);
          // Actualizează starea pentru a reflecta ștergerea datelor sau întreprinde alte acțiuni corespunzătoare
      })
      .catch(error => {
          console.error("Error clearing all records:", error);
          // Afișează un mesaj de eroare sau întreprinde alte acțiuni corespunzătoare
      });
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
          axios.delete(`http://localhost:3001/api/delete/${item.id}`)
        })
        setTodo(todos)
    }
    
    
    
    function showIncompleteTasks(){
      axios.get(`http://localhost:3001/api/get-incompleted`).then(res=>{
        if(res.data.length>0)
        setTodo(res.data)
      })
      
    }
    
    function showCompleteTasks(){
      axios.get(`http://localhost:3001/api/get-completed`).then(res=>{
        if(res.data.length>0)
        setTodo(res.data)
      })
     
    }



    function showAll(){
      axios.get('http://localhost:3001/api/get').then(response=>{
        setTodo(response.data)
    })}
    
    
    
      return (
        <div>
    
            {todo.length>1? 
            <div className='footer'>
                <span className='counter'>
                    |{taskCount} tasks | completed {completed} |
                 </span>
            <button className='clear-all' onClick={()=>clear()}>clear all</button></div>:
            <div></div>}
            {completed>0&&<button className='delete-completed' onClick={()=>deleteSelected()}>delete completed</button>
    }   
      {todo.length>0?<div className='footer-btn'>
            <button className='show-incomplete' onClick={()=>showIncompleteTasks()}>
              Incomplete Tasks
            </button>
            <button className='show-complete' onClick={()=>showCompleteTasks()}>
              Complete Tasks
            </button>
            <button className='show-all-tasks' onClick={()=>showAll()}>
             All Tasks
            </button>
        </div>: ''}
    
        
        </div>
      )
    }
    

export default Footer