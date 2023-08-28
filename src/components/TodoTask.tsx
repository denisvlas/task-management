import React,{useEffect, useState}from 'react'
import {Todo} from '../models'
import Footer from './Footer'
import TodoForm from './TodoForm'
import axios from 'axios'; 

interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
    taskCount:number
    setTaskCount:React.Dispatch<React.SetStateAction<number>>
}


const TodoTask:React.FC<Props> = ({todo,setTodo,taskCount,setTaskCount}) => {


    function deleteTodo(id:number){
        

        axios.delete(`http://localhost:3001/api/delete/${id}`)

        let newTodo=[...todo].filter(item=>item.id!=id)
        setTodo(newTodo)
        setTaskCount(newTodo.length)


        
    }

    

    function done(id:number,item:Todo){

        axios.put(`http://localhost:3001/api/update-status/${id}`,{
            status:!item.status
        })

        let newTodo=[...todo].map(item=>{

           if(id===item.id)
               item.status=!item.status
           return item
           }) 
       

      setTodo([...todo])
   }

   const [edit,setEdit]=useState<null|number>(null)

   function editTodo(id:number,task:string){
        setEdit(id)
        setInputValue(task)
    }

    const [inputValue,setInputValue]=useState('')
    
    function saveValue(id:number,item:Todo){

        axios.put(`http://localhost:3001/api/update-task/${id}`,{
            task:inputValue
        })


        
       let todos=[...todo].map((item)=>{
            if(item.id===id){
                item.task=inputValue
            }
            return item
       })
       setTodo(todos)
        setInputValue('')
        setEdit(null)
    }

    

  return (
    <div className='todo-task-wrapper'>
              

        {
            todo.map((item)=>(
            <div className={`${item.status?'done':'not-done'} todo-item`} key={item.id}>

                <div className='todo-task'>
                    {edit===item.id?
                    <div className='edit-form'>
                    <div >
                        <input  className="todo-task" placeholder='I have to...' value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
                    </div>
                    <div>
                         <button className='apply-task-btn'onClick={()=>saveValue(item.id,item)} >apply</button>
                    </div>
                </div>:(
                   <div className='todo-task'>
                    <p>{item.task}</p>

                      <div className='todo-btn'>
                    <i className="bi bi-pencil-square modify-btn " onClick={()=>editTodo(item.id,item.task)}></i>
                   
                    {item.status?
                    <i className="bi bi-arrow-clockwise updtate-btn"onClick={()=>done(item.id,item)} ></i>:
                    <i className="bi bi-check2 completed-btn" onClick={()=>done(item.id,item)}></i>}
                     <i className="bi bi-trash3 delete-btn" onClick={()=>deleteTodo(item.id)}></i>
                    
                </div></div>)
                }
                   
                </div>

              
            </div>

            ))
        }
         <Footer todo={todo} setTodo={setTodo} taskCount={taskCount}/>
    </div>
  )
}

export default TodoTask