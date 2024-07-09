// src/components/TodoItem.js
import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.due_date);

    const handleUpdate = () => {
        axios.put(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
            title,
            description,
            due_date: dueDate,
            completed: todo.completed
        })
        .then(response => {
            updateTodo(response.data);
            setIsEditing(false);
        })
        .catch(error => console.log(error));
    };

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/todos/${todo.id}/`)
        .then(() => deleteTodo(todo.id))
        .catch(error => console.log(error));
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p>{todo.due_date}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TodoItem;
