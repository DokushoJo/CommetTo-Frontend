import React, { useState } from 'react'
import { Axios } from 'axios'
import axios from 'axios'


const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

export function Save() {
//useState

const [add,setAdd] = useState(false);
const [editButton, setEditButton] = useState('Add');   
const [addData, setAddData] = useState({
  name: '',
  time: '',
  description: '',
});

//useEffect

//handler functions

const handleClick = () => {
    setEditButton(editButton === 'Add' ? 'Saved' : 'Saved');
}

//creates object takes in event details.
const handleEventsData = (key, e) => {  
  e.preventDefault();
  const value = e.target.value;
  const newData = {...addData, [key]: value }
  setAddData(newData);
  // console.log(addData)
}

//function data sending to Database
const handleSumbitData = async (e) => {
  e.preventDefault();
  
  const userData = {
    name: addData.name,
    description: addData.description,
    time: addData.time,
  };
  
  if(!addData.name || !addData.description || !addData.time){
    console.log('Input required!')
    return;
}
  console.log(userData)

  try{
    const response = await axios.post( BACKEND_URL + 'event', userData);
    console.log(response);
  } catch (error){
    return 'Invalid Input';
  }

  // await axios.post(BACKEND_URL + 'event', userData)
  // .then(res => console.log(res.data))
  // .catch(err => console.log(err))
}


//JSX return 

  return (
    <>

    {/* Add and input data */}

    <div> 
      <div className='w-96 container-add flex-row justify-self-center  h-auto rounded-lg dark:bg-gray-100 p-10 shadow-inner shadow-2xl'>
        <h1 className='text-center mt-3 mb-8 font-extrabold text-[#2d7fa3] text-3xl'>Add Event</h1>
         
         <form onSubmit={handleSumbitData}>
              {/* EVENTNAME */}
              <div className="mb-5" > 
                  <h1  className='float-left mb-2'>Name</h1>
                  <label htmlFor="event-name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={addData.name} onChange={e => handleEventsData("name", e)} placeholder="Event Name" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
              {/* SCHEDULE */}
              <div className="mb-5"> 
                  <h1 className='float-left mb-2'>Schedule</h1>
                  <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={addData.time} onChange={e => handleEventsData("time", e)} placeholder="Date and Time" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
            {/* DECRIPTION */}
              <div className="mb-5"> 
                  <h1 className='float-left mb-2'>Description</h1>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <textarea type="text" value={addData.description} onChange={e => handleEventsData("description", e)} placeholder="Description" id="small-input" className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              

              {/* ADD BUTTON */}
              <div>
              <button 
                  onClick={handleClick}
                  type="submit"
                  className="mt-3 ml-24 select-none rounded-lg bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-cyan-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  w-32 flex-none 
                  hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  {editButton}
              </button>
              </div>    

        </form>
        </div>
      </div>
  </>

  )
}