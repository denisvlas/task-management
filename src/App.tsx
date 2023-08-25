import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import { Todo } from './models';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

   const storedTodo = localStorage.getItem('todo');
  const initialTodo = storedTodo ? JSON.parse(storedTodo) : [];
  const [todo, setTodo] = useState<Todo[]>(initialTodo);
  
  useEffect(()=>{
    const todoData=localStorage.getItem('todo')
    if(todoData){
      setTodo(JSON.parse(todoData))
      
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo))
  },[todo])

  return (

    <div className="App">
      <h1>todos</h1>
      <TaskList todo={todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
