import React,{useState}from 'react'
import {Todo} from '../models'
import Footer from './Footer'
import TodoForm from './TodoForm'

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
               item.status=!item.status
           return item
           }) 
       const completed=todo.filter(item=>item.status===true)
       const uncompleted=todo.filter(item=>item.status===false)
       const sortedUncompleted=uncompleted.sort((a,b)=>a.id-b.id)
       const sortedCompleted=completed.sort((a,b)=>a.id-b.id)

      setTodo([...sortedUncompleted,...completed])
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
  return (
    <div className='todo-task-wrapper'>
              <TodoForm todo={todo} setTodo={setTodo}/>

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
                         <button className='apply-task-btn'onClick={()=>saveValue(item.id)} >apply</button>
                    </div>
                </div>:(
                   <div className='todo-task'>
                    <p>{item.title}</p>

                      <div className='todo-btn'>
                    <i className="bi bi-pencil-square modify-btn " onClick={()=>editTodo(item.id,item.title)}></i>
                   
                    {item.status?
                    <i className="bi bi-arrow-clockwise updtate-btn"onClick={()=>done(item.id)} ></i>:
                    <i className="bi bi-check2 completed-btn" onClick={()=>done(item.id)}></i>}
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