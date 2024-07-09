// src/components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/todos/', {
            title,
            description,
            due_date: dueDate,
        })
        .then(response => {
            addTodo(response.data);  // Update state in parent component
            setTitle('');
            setDescription('');
            setDueDate('');
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
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
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;

