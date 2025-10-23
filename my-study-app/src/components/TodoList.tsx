import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const formattedDate=format(new Date(), 'yyyy.MM.dd');

    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    const [editingId,setEditingId]=useState<number|null>(null);
    const [editText, setEditText]=useState("");
    
    const [fapen, setFapen]=useState(false);
    const [fatrash, setFatrash]=useState(true);
    const [save,setSave]=useState(true);
    const [editMode, setEditMode]=useState(false);

    const insertTodo = () => {
        if (newTodo.trim() === "")
            return;
        const newItem = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newItem]);
        setNewTodo("");
    }
    const updateTodo=(id:number, text:string)=>{
        setEditingId(id);
        setEditText(text);
        setFapen(prev=>!prev);
        setFatrash(prev=>!prev);
        setSave(prev=>!prev);
    }
    const deleteTodo=(id:number)=>{
        setTodos(todos.filter(todo=>todo.id!==id));
    }
    const saveTodo=()=>{
        setTodos(prev=>prev);
        setFatrash(prev=>!prev);
        setSave(prev=>!prev);
    }
    const complete=Math.round((todos.filter(todo => todo.completed).length/todos.length)*100);
    return (
        <div>
            <div>
                <span>{formattedDate}</span>
                <div>완성도</div>
                <div>{(todos.length===0 ? "":(complete)+'%')}</div>
                <progress max={todos.length} value={todos.filter(todo=>todo.completed).length}></progress>
                <div></div>
            </div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.completed} disabled={fapen} onChange={() => setTodos(todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t))}></input>
                    {editingId===todo.id  ? (<input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} autoFocus />) : <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>}
                    
                    {!fapen && <FontAwesomeIcon icon={faPen} onClick={()=>updateTodo(todo.id, todo.text)}/>}
                    {!fatrash && <FontAwesomeIcon icon={faTrash} onClick={()=>deleteTodo(todo.id)}/>}
                    {!save && <button onClick={()=>setSave(true)}>저장</button>}
                </div>
            ))}
            <input type="text" placeholder='todolist를 입력하세요' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></input>
            <button onClick={insertTodo}>추가</button>
        </div>
    )
}

export default TodoList;