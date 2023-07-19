import React, { useState } from 'react';
import './TodoList.css'; // Import your CSS file for styling

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', isCompleted: false, dateListed: '2023-07-31', dateAccomplished: null },
    { id: 2, text: 'Build a Todo App', isCompleted: false, dateListed: '2023-08-10', dateAccomplished: null },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);

      const newTaskObject = {
        id: tasks.length + 1,
        text: newTask,
        isCompleted: false,
        dateListed: formattedDate,
        dateAccomplished: null,
      };

      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const handleToggleChecklist = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
            dateAccomplished: !task.isCompleted ? new Date().toISOString().slice(0, 10) : null,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1 style={{ color: 'black' }}>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={handleAddTask} style={{ backgroundColor: 'lightgreen' }}>
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.isCompleted ? 'completed' : ''}`}>
            <span onClick={() => handleToggleChecklist(task.id)}>
              {task.isCompleted ? '☑' : '☐'} {task.text}
            </span>
            {task.isCompleted ? (
              <span className="date-accomplished">Date Accomplished: {task.dateAccomplished}</span>
            ) : (
              <span className="date-listed">Date Listed: {task.dateListed}</span>
            )}
            <button onClick={() => handleDeleteTask(task.id)} style={{ backgroundColor: 'ruby' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
