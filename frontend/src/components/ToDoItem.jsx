import React, { useState } from 'react';
import { AiOutlineCalendar } from "react-icons/ai";
import axios from 'axios';

const ToDoItem = ({ data, onCloseModal, setUpdatedMessage }) => {
  const [updatedTitle, setUpdatedTitle] = useState(data.title);
  const [updatedDescription, setUpdatedDescription] = useState(data.description);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleCancel = () => {
    onCloseModal();
  }

  const currentDate = new Date();
  const date = new Date(data.timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = date.toLocaleDateString('en-US', options);

  if (date.toDateString() === currentDate.toDateString()) {
    formattedDate = 'Today';
  } else if (date.toDateString() === new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString()) {
    formattedDate = 'Tomorrow';
  }

  const handleSaveChanges = async () => {
    const saveTask = {
        title: updatedTitle,
        description: updatedDescription,
        updated: true,
    }

    axios.put(`http://127.0.0.1:8000/api/update/${data.id}`, saveTask)
      .then(response => {
        setUpdatedMessage('Task updated successfully')
        handleCancel();            
        window.location.reload();   
      })
      .catch(error => {
        console.error('Error save changes:', error);
      });

  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-30' onClick={onCloseModal}>
      <div className='bg-white rounded popup-animation px-3 py-6' onClick={stopPropagation}>
        <div className="mb-4 mt-5 ml-6 mr-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title">
                Title
            </label>
            <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id={data.id} onChange={e => setUpdatedTitle(e.target.value)} value={updatedTitle} type="text" />
        </div>

        <div className="mb-4 mt-5 ml-6 mr-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                Description
            </label>
            <textarea className="appearance-none block w-full h-44 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={e => setUpdatedDescription(e.target.value)} id="description">{data.description == null ? 'Add a description..' : data.description}</textarea>
        </div>

        <div className="inline-flex">
            <div className="pl-6">
                <AiOutlineCalendar size={20} />            
            </div>
            <span className="pl-5 relative">{formattedDate}</span>
        </div>

        <div className="relative left-25 flex justify-end items-end pb-5">
          <button className="flex-shrink-0 bg-primary-500 hover:bg-primary-700 border-primary-500 hover:border-primary-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" onClick={handleSaveChanges}>
            Save
          </button>
          <button onClick={handleCancel} className="flex-shrink-0 border-transparent border-4 text-primary-500 hover:text-primary-800 text-sm py-1 px-2 rounded" type="button">
            Cancel
          </button>
        </div> 
      </div>
    </div>
  );
};

export default ToDoItem;