import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import { Todo, TodoStatusType } from './models';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const statuses=[TodoStatusType.incompleted,TodoStatusType.progress,TodoStatusType.done]

function App() {

  const [todo,setTodo]=useState<Todo[]>([
    {id:1,status:TodoStatusType.incompleted,title:'1'},
    {id:2,status:TodoStatusType.incompleted,title:'2'},
    {id:3,status:TodoStatusType.incompleted,title:'3'},
    {id:4,status:TodoStatusType.incompleted,title:'4'},
    {id:5,status:TodoStatusType.incompleted,title:'5'},
    {id:6,status:TodoStatusType.incompleted,title:'6'},
    
  ])

  return (

    <div className="App ">
      <h1>todos</h1>
      <TodoForm todo={todo} setTodo={setTodo}/>
      <TaskList todo={todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
