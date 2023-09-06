import React,{useState}from 'react'
import {Todo, TodoStatus, TodoStatusType} from '../models'
import Footer from './Footer'
import TodoForm from './TodoForm'
import { statuses } from '../App'


interface Props{
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}


const TodoTask:React.FC<Props> = ({todo,setTodo}) => {


    function deleteTodo(id:number){
        let newTodo=[...todo].filter(item=>item.id!=id)
        setTodo(newTodo)
       
    }


    function done(id:number){
        let newTodo=[...todo].map(item=>{

           if(id===item.id)
           item.status=TodoStatusType.done

           return item
           }) 
       

      setTodo(newTodo)
   }

   const [edit,setEdit]=useState<null|number>(null)

   function editTodo(id:number,title:string){
        setEdit(id)
        setInputValue(title)
    }

    const [inputValue,setInputValue]=useState('')
    
    function saveValue(id:number){
        setInputValue(inputValue)
        
       let todos=[...todo].map((item)=>{
            if(item.id===id){
                item.title=inputValue
            }
            return item
       })
       setTodo(todos)
        setInputValue('')
        setEdit(null)
    }

    function changeStatus(id:number,newStatus:any){
            todo.map(item=>{
                setTodo(todo.map(item=>item.id===id?{...item,status:newStatus}:item))
            })
    }


  return (
    <div className='todo-task-wrapper'>
        {
            todo.filter(item=>item.status===TodoStatusType.incompleted)
            .map((item)=>(
            <div
             className='not-done todo-item'
            key={item.id}

             >
             

                <div className='todo-task'>
                    {edit===item.id?
                    <div className='edit-form'>
                    <div >
                        <input  className="todo-task" placeholder='I have to...' value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
                    </div>
                    <div>
                         <button className='apply-task-btn'onClick={()=>saveValue(item.id)} >apply</button>
                    </div>
                </div>:(
                   <div className='todo-task'>
                    <p>{item.title}</p>

                      <div className='todo-btn'>
                    <i className="bi bi-pencil-square modify-btn " onClick={()=>editTodo(item.id,item.title)}></i>
                   
                    <select aria-label='Default select example' defaultValue={item.status} onChange={(e)=>changeStatus(item.id,e.target.value)}>
                        {statuses.map(status=><option key={status} value={status}>{status}</option>)}
                    </select>
                     <i className="bi bi-trash3 delete-btn" onClick={()=>deleteTodo(item.id)}></i>
                    
                </div></div>)
                }
                   
                </div>

              
            </div>

            ))
        }
         <Footer todo={todo} setTodo={setTodo}/>
    </div>
  )
}

export default TodoTask