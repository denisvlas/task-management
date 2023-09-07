import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TaskList from './components/TaskList';
import { Todo, TodoStatusType } from './models';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {ListTask} from './components/ListTask';
import Footer from './components/Footer';

export const statuses=[TodoStatusType.progress,TodoStatusType.incompleted,TodoStatusType.done]

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
<DndProvider backend={HTML5Backend}>
    <div className="App ">
      <h1>todos</h1>
      <TodoForm todo={todo} setTodo={setTodo}/>
      <Footer todo={todo} setTodo={setTodo}/>
      <ListTask todo={todo} setTodo={setTodo}/>
      </div>
</DndProvider>
  );
}

export default App;
