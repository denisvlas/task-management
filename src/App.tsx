import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import { Todo } from './models';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  const [todo,setTodo]=useState<Todo[]>([])
  

  return (

    <div className="App">
      <h1>todos</h1>
      <TodoForm todo={todo} setTodo={setTodo}/>
      <TaskList todo={todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
