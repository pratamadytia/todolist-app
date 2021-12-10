import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../Model';
import SingleTodo from './SingleTodo';
import "./style.css";


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    CompletedTodos: Array<Todo>;
  }
  
  const TodoList: React.FC<Props> = ({ todos, setTodos, setCompletedTodos, CompletedTodos }) => {
    return (
      <div className="container">
        <Droppable droppableId="TodosList">
        {(provided) => (
            <div className="todos">
            <span className="todos__heading" ref={provided.innerRef}{...provided.droppableProps}>Still Running !</span>
            {todos.map((todo,  index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
            {provided.placeholder}
           </div>
           )}
        </Droppable>
          
        <Droppable droppableId="TodoRemove">
        {(provided) => (
            <div className="todos  running">
            <span className="todos__heading"ref={provided.innerRef}{...provided.droppableProps}>Completed !</span>
            {CompletedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))}
            {provided.placeholder}
           </div>
           )}
        </Droppable>
          
      </div>
    );
  };
export default TodoList;
