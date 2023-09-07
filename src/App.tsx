import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import { Todo, TodoStatusType } from './models';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const statuses=[TodoStatusType.incompleted,TodoStatusType.progress,TodoStatusType.done]

function App() {

  const [todo,setTodo]=useState<Todo[]>([
   
    
  ])

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTodo(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="App ">
      <h1>todos</h1>
      <TodoForm todo={todo} setTodo={setTodo}/>
      <TaskList todo={todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
