import React, { useState, useEffect } from 'react';
import iconCross from '../images/icon-cross.svg';
import ToDoItem from './ToDoItem';
import { Alert } from 'react-alert'

import axios from 'axios';

const ToDoList = ({ data }) => {  
  const [modalPopup, setModalPopup] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState('');

  const modalChange = () => {
    setModalPopup(!modalPopup);
  };

  const deleteTask = async (e) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/${data.id}`)
      .then(response => {
        const message = response.data 
        setUpdatedMessage(message)               
        alert(message)        
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  }

  const completedToDo = async () => {
    data.completed = true;

    const completedTask = {
      completed: true,
    };
  
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update/${data.id}`, completedTask);
      const message = response.data;
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const spanClassVariant = data.completed
    ? 'line-through relative text-gray-300 dark:text-gray-500'
    : 'dark:text-slate-800';
  return (
    <li
      className="group cursor-pointer flex items-center gap-4 border-b border-b-gray-300 px-4 py-3 dark:border-b-gray-500 lg:px-6 lg:py-4"
    >
        <span
          className={`${spanClassVariant}  mt-1 flex-1 overflow-hidden overflow-ellipsis whitespace-pre text-sm transition-all duration-300 md:text-base lg:font-medium`}
        >
          <div className="checkbox-border-wrap" onClick={completedToDo}><span className={`checkbox ${data.completed ? 'bg-gray-600' : 'bg-white'}`}></span></div>
          <span className={`title-todo font-custom`} onClick={modalChange}>{data.title}</span>
        </span>

      <button onClick={deleteTask} className="h-3 w-3 lg:h-4 lg:w-4 flex items-end justify-end">
        <img src={iconCross} alt="delete task" />
      </button>
      
      {modalPopup && <ToDoItem data={data} updatedMessage={updatedMessage} setUpdatedMessage={setUpdatedMessage} onCloseModal={modalChange} />}
    
    </li>
  );
};

export default ToDoList;