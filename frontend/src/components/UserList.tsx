import axios from "axios"
import { useState ,useEffect} from "react"
import { Todo, User } from "../models"

interface Props{
  modal: Todo;
  todo:Todo[]
  setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
  setShowMembers:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserList:React.FC<Props>=({modal,todo,setTodo,setShowMembers})=> {
    const [users,setUsers]=useState<User[]>([])


    useEffect(()=>{
         axios.get('http://localhost:3001/users').then(res=>{
              setUsers(res.data)
         }).catch(e=>console.log(e))
    },[setUsers])
        

    function attachUser(id:number,user:User){
        const newTodo=todo.map(item=>{
          if(item.id===id){
            item.user=user.username
          }
          return item
        })

        setShowMembers(false)
        setTodo(newTodo)
        localStorage.setItem('tasks',JSON.stringify(todo))
    }
            
   function unAttachUser(id:number){
    const newTodo=todo.map(item=>{
      if(item.id===id){
        item.user=undefined
      }
      return item
    })
    
      setTodo(newTodo)   
   }
    return (
      <div className='users'>
        {
        users.length>0?(
          <div className="users">
        <p onClick={()=>unAttachUser(modal.id)} className="user-null">------null------</p>
        {users.map(user=><p onClick={()=>attachUser(modal.id,user)} key={user.username} className="user">{user.username}</p>)}  </div>):
        <p className="user">no users</p>
        }
        
      </div>
    )
  }
  