import React, { useEffect, useState } from "react";
import { ProjectType, Todo, TodoStatusType } from "../models";
import axios from "axios";

interface Props {
  todo: Todo[];
  project: ProjectType | undefined;
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  userId: string | undefined;
}

const TodoForm: React.FC<Props> = ({ todo, setTodo, project, userId }) => {
  const [input, setInput] = useState("");
  const [lastId, setLastId] = useState<number>(1);
  useEffect(() => {
    getLastId();
  }, [todo]);

  const getLastId = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get-last-id");
      const lastId = res.data[0]["MAX(id)"];
      setLastId(lastId);
    } catch (err) {
      console.log(err);
    }
  };

 const [warning,setWarning]=useState('')



  const handleAddTask = async () => {
    
    if(input.length<1){
      return setWarning('Write something')
    }
    try {
     
      await axios.post("http://localhost:3001/add-task", {
        title: input,
        status: TodoStatusType.incompleted,
        description: undefined,
        comment: undefined,
        userId: null,
        projectId: project?.projects_id,
      });

      const newTodo = [
        ...todo,
        {
          id: lastId + 1,
          status: TodoStatusType.incompleted,
          title: input,
          user_id: null,
        },
      ];
      setTodo(newTodo);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }
  return (
    <div className="add-task-section">
      <input
        onClick={()=>setWarning('')}
        onKeyPress={handleKeyPress}
        placeholder={`${warning?warning:'Add a task ...'}`}
        type="text"
        className="input-task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => handleAddTask()} className="add-task-btn">
        add
      </button>
    </div>
  );
};

export default TodoForm;
