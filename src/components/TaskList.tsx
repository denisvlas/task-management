import React from 'react';
import TodoTask from './TodoTask';
import { Todo } from '../models';
import Progress from './Progress';
import Done from './Done';

interface Props {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({ todo, setTodo }) => {
  return (
    <div className='task-list'>
      <Progress todo={todo} setTodo={setTodo} />
      <TodoTask todo={todo} setTodo={setTodo} />
      <Done todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default TaskList;
