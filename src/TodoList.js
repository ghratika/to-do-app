import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const handleAddTask = () => {
    if (inputTask.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: inputTask,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputTask('');
    }
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={inputTask}
        onChange={handleInputChange}
        placeholder='Enter a task'
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleToggleCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
