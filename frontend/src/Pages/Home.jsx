import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ToDoList from '../components/ToDoList';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/all')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  let count_completed_true = 0;

  for (const item of tasks) {
    if (item.completed) {
      count_completed_true += 1;
    }
  }

  const clearClick = async () => {
    for (const item of tasks) {
      if (item.completed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/delete/${item.id}`);
          console.log(`Task with ID ${item.id} deleted successfully.`);
        } catch (error) {
          console.error(`Error deleting task with ID ${item.id}:`, error);
        }
      }
    }
    window.location.reload();
  };

  const addToDo = async () => {
    if (taskTitle.trim() === '') {
      return;
    }

    const taskData = {
      title: taskTitle,
      description: ''
    }

    axios.post('http://127.0.0.1:8000/api/add/', taskData)
      .then(response => {
        const addedTask = response.data;
        setTaskTitle(''); 
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });

  }

  return (
    <div className="min-h-screen bg-gray-100 bg-mobile-light bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-mobile-dark sm:bg-desktop-light dark:sm:bg-desktop-dark">
      <div className="py-12 px-6 md:mx-auto md:w-[40rem] md:px-0 md:pt-16 lg:pt-20">
        <Header />

        <form className="mt-6 mb-4 flex items-center rounded-md bg-white px-4 py-3 dark:bg-dark-blue lg:mt-12 lg:mb-6 lg:px-6 lg:py-4"
        >
          
          <input
            className="mt-1 ml-4 flex-1 text-sm outline-none dark:bg-dark-blue dark:text-black md:text-base"
            placeholder="Create a new todos..."
            required
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
            pattern="[^\s]+(\s+[^\s]+)*"
          />

          <button onClick={addToDo} className="bg-primary-600 text-white px-3 py-1 rounded">Add</button>
        </form>
        {console.log(tasks)}

        <ul className="rounded-md bg-white shadow-xl dark:bg-dark-blue">
          {tasks.map((todo, index) => {
            return (
              <ToDoList
                key={todo.id}
                data={todo}
              />
            );
          })}

          <li className="relative flex items-center justify-between px-4 py-3 text-xs text-slate-400 sm:text-sm">
           
            <button className="hover:text-black text-gray-800	font-custom">
              All Tasks : {tasks.length}
            </button>

            <button className="hover:text-black text-gray-800	font-custom">
                Completed items : {count_completed_true}
            </button>

            <button onClick={clearClick} className="hover:text-black text-gray-800	font-custom">
                Clear Completed
            </button>
          </li>
        </ul>

        <footer className="mt-20 text-center text-slate-400 sm:mt-10">&copy; Copyright 2023 DayToDo</footer>
      </div>
    </div>
  );
};

export default Home;