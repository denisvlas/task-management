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
      <div ref={drop} className='todo-task-wrapper'>
           <Header status={status} count={tasksToMap.length} bg={bg}/>
           {tasksToMap.map(item=><Task bg={bg} key={item.id} todo={todo} setTodo={setTodo} item={item}/>)}
           
      </div>
    )
}

const Header=({status,count,bg}:{status:string,count:number,bg:string})=>{

    return (
        
        <div style={{ backgroundColor: bg,display:'flex',alignItems:'center',height:50,paddingLeft:14 }}>
        {status}
        <div style={{marginLeft:20}}>{count}</div>
        </div>
        
    )
}


const Task=({bg,item,todo,setTodo}:{bg:string,item:Todo,todo:Todo[],setTodo:React.Dispatch<React.SetStateAction<Todo[]>>})=>{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item:{id:item.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    return(
        <div ref={drag} className='not-done todo-item'>
            <p>{item.title}</p>
        </div>
    )
}