import React,{useState,useEffect} from 'react'
import { Todo, TodoStatusType } from '../models'
import { statuses } from '../App';
import { useDrag, useDrop } from 'react-dnd'
import Footer from './Footer';

interface Props {
    todo: Todo[];
    setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  }

export const ListTask:React.FC<Props>=({todo,setTodo})=>{
    const[todos,setTodos]=useState<Todo[]>([])
    const[inProgress,setInProgress]=useState<Todo[]>([])
    const[done,setDone]=useState<Todo[]>([])

    useEffect(()=>{
        const fTodos=todo.filter(task=>task.status===TodoStatusType.incompleted)
        setTodos(fTodos)
        const fInProgress=todo.filter(task=>task.status===TodoStatusType.progress)
        setInProgress(fInProgress)
        const fDone=todo.filter(task=>task.status===TodoStatusType.done)
        setDone(fDone)

    },[todo])
  return (
    <div className='task-list'>
        {statuses.map((status,index)=><Section key={index} status={status} todo={todo} setTodo={setTodo} todos={todos}  inProgress={inProgress}  done={done} />)}
    </div>
  )
}

const Section=({ status,todo,todos,inProgress,done,setTodo }: { status: string,todo:Todo[],setTodo:React.Dispatch<React.SetStateAction<Todo[]>>,todos:Todo[],inProgress:Todo[],done:Todo[] })=>{
    


    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop:(item:Todo)=>addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

      function addItemToSection(id:number){
        setTodo((prev)=>{
         const mTasks=prev.map(t=>{
             if(t.id===id){
                 return {...t,status:status}
             }
             return t;
         })
         localStorage.setItem('tasks',JSON.stringify(mTasks))
         return mTasks as Todo[]
        })
     }

    let bg = 'white';
    let tasksToMap=todos

    if(status==='progress'){
         bg = 'orange';
         tasksToMap=inProgress
    }
    if(status==='done'){
         bg = 'green';
         tasksToMap=done
    }

    return(
      <div ref={drop}  className={isOver?'onOver':'todo-task-wrapper'}>
           <Header status={status} count={tasksToMap.length} bg={bg}/>
           {tasksToMap.map(item=><Task status={status} bg={bg} key={item.id} todo={todo} setTodo={setTodo} item={item}/>)}
           
      </div>
    )
}

const Header=({status,count,bg}:{status:string,count:number,bg:string})=>{

    return (
        
        <div style={{ backgroundColor: bg,display:'flex',alignItems:'center',justifyContent:'center',height:50,paddingLeft:14,color:'black',marginBottom:20}}>
        {status}
        <div style={{marginLeft:20}}>{count}</div>
        </div>
        
    )
}


const Task=({bg,item,todo,setTodo,status}:{status:string,bg:string,item:Todo,todo:Todo[],setTodo:React.Dispatch<React.SetStateAction<Todo[]>>})=>{


  function deleteTodo(id:number){
    let newTodo=[...todo].filter(item=>item.id!=id)
    setTodo(newTodo)
   
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
        <div  ref={drag} className={`${status==='to do'?'not-done':status==='progress'?'progress':'done'} todo-item ${isDragging?'dragging':''}`}>
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
                     <i className="bi bi-trash3 delete-btn" onClick={()=>deleteTodo(item.id)}></i>
                    
                </div></div>)
                }
                   
                </div>
        </div>
    )
}