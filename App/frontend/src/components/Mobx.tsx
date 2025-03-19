import React, { useEffect, useState } from "react";
import { types, onSnapshot, getSnapshot } from "mobx-state-tree";
import { deleteTask } from "../graphql/queries";

const Task = types
  .model({
    id: types.optional(types.string, ""),
    todo: types.optional(types.string, ""),
  })
  .actions((self) => ({
    modifyTask(newTodo: string) {
      self.todo = newTodo;
    },
  }));

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(id: string, todo: string) {
      self.tasks.push(Task.create({ id, todo }));
    },
    deleteTask(id: string) {
        const filteredTasks = self.tasks.filter(task => task.id !== id);
      
        // Înlocuiește array-ul existent cu cel nou folosind replace
        self.tasks.replace(filteredTasks);
      }
  }));

const initialStore = TaskStore.create({
  tasks: [],
});

export default function Mobx() {
  const [store] = useState(() => initialStore);
  const [snapshot, setSnapshot] = useState({});

  useEffect(() => {
    // 5. Ascultă schimbările în store și actualizează snapshot-ul
    const disposer = onSnapshot(store, (snapshot) => {
      setSnapshot(snapshot);
    });
    return () => disposer(); // cleanup
  }, [store]);

  function handleClick() {
    store.addTask(Date.now().toString(), "New task" + Date.now().toString());
    console.log("Current snapshot:", getSnapshot(store));
  }


  function show() {
    const disposer = onSnapshot(store, (snapshot) => {
      setSnapshot(snapshot);
    });
    console.log("snap", snapshot);
  }
  const [input,setInput]=useState("")

  function handleInput(id:string){
    
  }
  return (
    <>
      <button onClick={handleClick}>adauga task</button>
      <button onClick={show}>show</button>
      <>
        {store.tasks.map((task) => {
          return (
            <div key={task.id} style={{ display: "flex" }}>
              <li>{task.todo}</li>
              <button onClick={() => store.deleteTask(task.id)}>delete</button>
              <button onClick={(e) => task.modifyTask(input)}>modifyTask</button>
              <input style={{width:"250px",border:"1px solid black"}} type="text" onChange={(e)=>setInput(e.target.value)}/>
            </div>
          );
        })}
      </>
    </>
  );
}
