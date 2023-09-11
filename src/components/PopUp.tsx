import React, { useState } from 'react';
import { Todo } from '../models';

interface PopUpProps {
    modal: null|Todo;
    setModal: React.Dispatch<React.SetStateAction<Todo|null>>;
    todo:Todo[]
    setTodo:React.Dispatch<React.SetStateAction<Todo[]>>
}

const PopUp: React.FC<PopUpProps> = ({ todo,setTodo,modal, setModal }) => {

  const [inputDescription,setInputDescription]=useState('')
  const [inputComment,setInputComment]=useState('')

  function saveDescription(id:number){
    const newTodo=todo.map(item=>{
      if(item.id===id){
        item.description=inputDescription
      }
      return item
    })
    
    setTodo(newTodo)
    localStorage.setItem('tasks',JSON.stringify(todo))
    setInputDescription('')
    

  }
 
  function saveComment(id:number){
    
      const newTodo=todo.map(item=>{
        if(item.id===id){
          item.comment=inputComment
        }
        return item
      })
      setTodo(newTodo)
      localStorage.setItem('tasks',JSON.stringify(todo))
      setInputComment('')
  }


  function saveEditDescription(id:number){
    const newTodo=todo.map(item=>{
      if(item.id===id){
        item.description=editDescription
      }
      return item
    })

    setTodo(newTodo)
    localStorage.setItem('tasks',JSON.stringify(todo))
    setEditDescription(null)



  }
  function saveEditComment(id:number){
    const newTodo=todo.map(item=>{
      if(item.id===id){
        item.comment=editComment
      }
      return item
    })

    setTodo(newTodo)
    localStorage.setItem('tasks',JSON.stringify(todo))
    setEditComment(null)



  }
function deleteDescription(id:number){
  const newTodo=todo.map(item=>{
    if(item.id===id){
      item.description=null
    }
    return item
  })

  setTodo(newTodo)
  localStorage.setItem('tasks',JSON.stringify(todo))
}

function deleteComment(id:number){
    const newTodo=todo.map(item=>{
    if(item.id===id){
      item.comment=null
    }
    return item
  })

  setTodo(newTodo)
  localStorage.setItem('tasks',JSON.stringify(todo))

}

  const [editDescription,setEditDescription]=useState<null|string>(null)
  const [editComment,setEditComment]=useState<null|string>(null)

  return (
        <>
            {modal && (
                <div  className='popup-background'>
                    <div className='pop-container'>

                      <div className='pop-header'>
                        <div className='card-details'>
                          <span className='card-title'><i className="bi bi-card-text card-icon"></i>{modal.title}</span>
                          <span className='card-status'>in list {modal.status}</span>
                        </div>
                        <i  onClick={() => setModal(null)} className="bi bi-x-lg close-modal" ></i>
                      </div>

                      <div className='description-section'>
                        <hr className='hr-modal'/>
                        <div className='description-section-header'>
                          <span className='description-title'><i className="bi bi-chat-left-text-fill card-description-icon"></i>Description</span>
                          {modal.description && <div className='card-edit-delete-btn'>
                           <i onClick={()=>setEditDescription(modal.description)} className="bi bi-pen edit-description"></i> 
                           <i  onClick={()=>deleteDescription(modal.id)} className="bi bi-trash3 edit-description" ></i>
                           </div>}
                        </div>
                        {modal.description?(
                            <>
                              {editDescription?(
                              <div className='input-description'>
                                <textarea value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} className='card-inputs' placeholder='Add more detailed description ...' />
                                <div className='save-cancel-btn'>
                                  <button className='description-save-btn' onClick={()=>saveEditDescription(modal.id)}>save</button>
                                  <button className='description-save-btn' onClick={()=>setEditDescription(null)}>cancel</button>
                                </div>
                            </div>):
                        <p className='description-text'>{modal.description}</p>}

                              </>
                              ):
                       ( <div className='input-description'>
                          <textarea value={inputDescription} onChange={(e)=>setInputDescription(e.target.value)} className='card-inputs' placeholder='Add more detailed description ...' />
                          <button className='description-save-btn' onClick={()=>saveDescription(modal.id)}>save</button>
                        </div>)}
                      </div>




                      <div className='comment-section'>
                      <hr className='hr-modal'/>
                        <div className='comment-section-header'>
                          <span className='comment-title'><i className="bi bi-chat card-comment-icon"></i>Comment</span>
                          {modal.comment && 
                          <div className='card-edit-delete-btn'>
                          <i onClick={()=>setEditComment(modal.comment)} className="bi bi-pen edit-description"></i>
                          <i  onClick={()=>deleteComment(modal.id)} className="bi bi-trash3 edit-description" ></i>
                          </div>
                          }
                        </div>

                        
                        {modal.comment?
                        <>
                          {editComment?
                          <div className='input-comment'>
                          <textarea value={editComment} onChange={(e)=>setEditComment(e.target.value)} className='card-inputs' placeholder='Add more detailed description ...' />
                          <div className='save-cancel-btn'>
                            <button className='description-save-btn' onClick={()=>saveEditComment(modal.id)}>save</button>
                            <button className='description-save-btn' onClick={()=>setEditComment(null)}>cancel</button>
                          </div>
                      </div>:
                         <p className='description-text'>{modal.comment}</p>}
                       
                        </>:
                        <div className='input-comment'>
                          <textarea value={inputComment} onChange={(e)=>setInputComment(e.target.value)}className='card-inputs' placeholder='Add a comment ...' />
                          <button className='comment-save-btn'onClick={()=>saveComment(modal.id)}>save</button>
                        </div>
                        }
                        


                      </div>
                        
                        

                    </div>
                </div>
            )}
        </>
    );
};

export default PopUp;
