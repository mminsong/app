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
    
    const [fapen, setFapen] = useState<{ [id: number]: boolean }>({});
    const [fatrash, setFatrash]=useState<{ [id: number]: boolean }>({});
    const [save,setSave]=useState<{ [id: number]: boolean }>({});

    const insertTodo = () => {
        if (newTodo.trim() === "")
            return;
        const newItem = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newItem]);
        setFatrash(prev=>({...prev,[newItem.id]:true}))
        setSave(prev=>({...prev,[newItem.id]:true}))
        setNewTodo("");
    }
    const updateTodo=(id:number, text:string)=>{
        setEditingId(id);
        setEditText(text);
        setFapen((prev)=>({...prev,[id]:true}));
        setFatrash((prev)=>({...prev,[id]:false}));
        setSave((prev)=>({...prev,[id]:false}));
    }
    const deleteTodo=(id:number)=>{
        setTodos(todos.filter(todo=>todo.id!==id));
        setFapen((prev)=>{
            const copy={...prev};
            delete copy[id];
            return copy;
        })
        setFatrash((prev)=>{
            const copy={...prev};
            delete copy[id];
            return copy;
        })
        setSave((prev)=>{
            const copy={...prev};
            delete copy[id];
            return copy;
        })
    }
    const saveTodo=(id:number)=>{
      setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)));
    setEditingId(null);
    setFapen((prev) => ({ ...prev, [id]: false }));
    setFatrash((prev) => ({ ...prev, [id]: true }));
    setSave((prev) => ({ ...prev, [id]: true }));
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
                    <input type="checkbox" checked={todo.completed} onChange={() => setTodos(todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t))}></input>
                    {editingId===todo.id  ? (<input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} autoFocus />) : <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>}
                    
                    {!fapen[todo.id] && <FontAwesomeIcon icon={faPen} onClick={()=>updateTodo(todo.id, todo.text)}/>}
                    {!fatrash[todo.id] && <FontAwesomeIcon icon={faTrash} onClick={()=>deleteTodo(todo.id)}/>}
                    {!save[todo.id] && <button onClick={()=>saveTodo(todo.id)}  onKeyDown={(e)=>e.key==="Enter"&&saveTodo(todo.id)}>저장</button>}
                </div>
            ))}
            <input type="text" placeholder='todolist를 입력하세요' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&insertTodo()}></input>
            <button onClick={insertTodo}>추가</button>
        </div>
    )
}

export default TodoList;