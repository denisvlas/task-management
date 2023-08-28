import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Todo } from './models';
import TodoForm from './components/TodoForm';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'; 

function App() {

  const [todo,setTodo]=useState<Todo[]>([])
  const [online,setOnline]=useState(true)
  const [loading,setLoading]=useState(true)


  const [taskCount,setTaskCount] = useState<number>(0)

  




  useEffect(()=>{  
     axios.get('http://localhost:3001/api/get').then(response=>{
            setLoading(true)
            setTodo(response.data)
            setLoading(false)
            setTaskCount(response.data.length)
  }).catch(err=>{  
    setOnline(false)
    console.log(err)
  })
  },[])
 

  return (

    <div className="App">

    
      {
        online?
        <div>
          <h1>todos</h1>
            <div className='todo-task-wrapper'>
              <TodoForm todo={todo} setTodo={setTodo} setTaskCount={setTaskCount}/>
            </div>
            {loading?
            <h4>loading...</h4>:
            <TaskList todo={todo} setTodo={setTodo} taskCount={taskCount} setTaskCount={setTaskCount}/>  
          }
              
          </div>:
          <h1>server disconnected</h1>
      }
     
    </div>
  );
}

export default App;
