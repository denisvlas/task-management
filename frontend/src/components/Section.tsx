import React from 'react'
import { Todo } from '../models'
import {  useDrop } from 'react-dnd'
import { Header } from './Header';
import { Task } from './Task';

interface Props{
  modal:Todo|null,
  setModal:React.Dispatch<React.SetStateAction<Todo|null>>,
  status: string,
  todo:Todo[],
  setTodo:React.Dispatch<React.SetStateAction<Todo[]>>,
  todos:Todo[],
  inProgress:Todo[],
  done:Todo[] 
}

export const Section=({ modal,setModal,status,todo,todos,inProgress,done,setTodo }:Props)=>{
    


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
           {tasksToMap.map(item=><Task modal={modal} setModal={setModal} status={status} bg={bg} key={item.id} todo={todo} setTodo={setTodo} item={item}/>)}
           
      </div>
    )
}