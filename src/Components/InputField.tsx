import React, { useRef } from 'react';
import "./style.css";

interface Props {
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({todo, setTodo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="input"onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          type="text"placeholder="Enter a Task To do"
          value={todo}
          ref={inputRef}
          onChange={(e) => setTodo(e.target.value)}
          className="input_box"
        />
        <button type="submit" className="input_submit">
          Create task
        </button>
      </form>
    )
}

export default InputField
