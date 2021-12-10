import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../Model';
import {AiFillEdit, AiTwotoneDelete} from 'react-icons/ai';
import {MdDoneAll} from 'react-icons/md';
import "./style.css";
import { Draggable } from 'react-beautiful-dnd';
type Props ={
    index:number;
    todo:Todo;
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({todo, todos, setTodos,index}: Props) => {
    const [edit, setedit] = useState<boolean>(false)
    const [editTodo, seteditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
      };

    const handleDelete = (id: number) =>{
        setTodos(
            todos.filter((todo)=> todo.id !==id)
        )
    }
    const handleEdit = (e:React.FormEvent, id:number) =>{
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setedit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        inputRef.current?.focus()
    },[edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                    <form className="todos__single" 
                    onSubmit={(e)=>handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                    {edit? (
                          <input ref = {inputRef} value={editTodo} onChange={(e)=>seteditTodo(e.target.value)} 
                          className='todos__single--text'/>
                    ):
                    todo.isDone?(
                        <s className="todos__single--text">{todo.todo}</s>
                    ):(
                        <span className="todos__single--text">{todo.todo}</span>
                    )
                   }  
                      <div>
                          <span className="icon" onClick={()=> {
                                  if(!edit && !todo.isDone){
                                      setedit(!edit);
                                  }
                          }}
                          >
          
                              <AiFillEdit/>
                          </span>
                          <span className="icon" onClick={()=>handleDelete(todo.id)}>
                              <AiTwotoneDelete/>
                          </span>
                          <span className="icon" onClick={()=>handleDone(todo.id)}>
                          <MdDoneAll/>
                          </span>
                      </div>
                  </form>

                )}
       
        </Draggable>
      
    )
}

export default SingleTodo
