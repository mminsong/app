import React, {useState, useEffect} from 'react';

const TodoList : React.FC=()=>{
    // const [todos,setTodos]=useState<Todo[]>;
    const [newTodo,setNewTodo]=useState('');

    const todoObject={
        id: Number,
        text: newTodo,
        completed: false,
    }
return(
    <div>
        <div>TodoList</div>
        <div>
            <div>Date</div>
            <div className="list">
                <div>
                <input type="checkbox" name="todolist"/><div>할일1</div>
                </div>
                <div>
                <input type="checkbox" name="todolist"/><div>할일2</div>
                </div>
                <div>
                <input type="checkbox" name="todolist"/><div>할일3</div>
                </div>
            </div>
        </div>
    </div>
)
}

export default TodoList;