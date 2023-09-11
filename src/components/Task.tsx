import { useState } from "react"
import { useDrag, useDrop } from 'react-dnd'
import { Todo } from "../models"

interface Props{
  modal:Todo|null,
  setModal:React.Dispatch<React.SetStateAction<Todo|null>>,
  status:string,
  bg:string,
  item:Todo,
  todo:Todo[],
  setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}

export const Task=({modal,setModal,item,todo,setTodo,status}:Props)=>{


    function deleteTodo(id:number){
      
      let newTodo=[...todo].filter(item=>item.id!=id)
      setTodo(newTodo)
      localStorage.setItem('tasks',JSON.stringify(newTodo))
     
  }
    const [edit,setEdit]=useState<null|number>(null)
  
    function editTodo(id:number,title:string){
      setEdit(id)
      setInputValue(title)
  }
  
  const [inputValue,setInputValue]=useState('')
  
  function saveValue(id:number){
      
     let todos=[...todo].map((item)=>{
          if(item.id===id){
              item.title=inputValue
          }
          return item
     })
     setTodo(todos)
      setInputValue('')
      setEdit(null)
      localStorage.setItem('tasks',JSON.stringify(todo))
  }
  
      const [{ isDragging }, drag] = useDrag(() => ({
          type: 'task',
          item:{id:item.id},
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
          })
        }))
  

        
        
   

  
      return(
        <div  ref={drag}  className={`${status==='to do'?'not-done':status==='progress'?'progress':'done'} todo-item ${isDragging?'dragging':''}`}>
              <div className='todo-task'>
                      {edit===item.id?
                      <div className='edit-form'>
                      <div >
                          <input   placeholder='I have to...' value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
                      </div>
                      <div className="edit-btn">
                           <button className='apply-task-btn'onClick={()=>saveValue(item.id)} >apply</button>
                           <button className='apply-task-btn'onClick={()=>setEdit(null)} >exit</button>
                           
                      </div>
                  </div>:(
                    <div className="todo-task">
                     <div onClick={()=>setModal(item)}  className='todo-task'>
                      <p>{item.title}</p>
  
                        </div><div className='todo-btn'>
                      <i className="bi bi-pencil-square modify-btn " onClick={()=>editTodo(item.id,item.title)}></i>
                       <i className="bi bi-trash3 delete-btn" onClick={()=>deleteTodo(item.id)}></i>
                      
                  </div></div>)
                  }
                     
                  </div>
                   
          </div>
         
          
       
      )
  }

