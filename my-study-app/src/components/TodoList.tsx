import React, { useState, useEffect } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

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


    return (
        <div>
            <div>
                <div>TodoList</div>
                <div>완성도</div>
                <div>{todos.filter(todo => todo.completed).length}/{todos.length}</div>
                <div></div>
            </div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.completed} onChange={() => setTodos(todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t))}></input>
                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                </div>
            ))}
            <input type="text" placeholder='todolist를 입력하세요' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></input>
            <button onClick={insertTodo}>추가</button>
        </div>
    )
}

export default TodoList;