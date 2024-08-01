import React, { useState } from 'react'
import { Axios } from 'axios'

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

export function Save() {
//useState

const [editButton, setEditButton] = useState('Add');   
const [addData, setAddData] = useState({
  name: '',
  time: '',
  description: '',
  password: '',
});

//useEffect


//handler functions

// checks password

const handleClick = () => {
    setEditButton(editButton === 'Add' ? 'Saved' : 'Add');
}

//creates object takes in event details.
const handleEventsData = (key, e) => {  
  e.preventDefault();
  const value = e.target.value;
  const newData = {...addData, [key]: value }
  setAddData(newData);
  console.log(addData)
}

//function data sending to Database
const handleSumbitData = async (e) => {
  e.preventDefault();
  const userData = {
    name: addData.name,
    description: addData.description,
    time: addData.time,
    password: addData.password,
  };

  try{
    const response = await Axios.post(BACKEND_URL + '/event', userData);
    console.log(response);
  } catch (error){
    return 'Invalid Input';
  }
}


//JSX return 

  return (
    <>

    {/* Add and input data */}

    <div> 
      <div className='container-add flex-row justify-self-center ml-72 max-w-md h-auto rounded-lg dark:bg-gray-100 p-10 shadow-2xl'>
        <h1 className=' mb-5 font-extrabold text-[#7a68bf] text-3xl'>Add Event</h1>
         
         <form onSubmit={handleSumbitData}>
              {/* EVENTNAME */}
              <div className="mb-5"> 
                  <label htmlFor="event-name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={addData.name} onChange={e => handleEventsData("name", e)} placeholder="Event Name" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
              {/* SCHEDULE */}
              <div className="mb-5"> Schedule
                  <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={addData.time} onChange={e => handleEventsData("time", e)} placeholder="Day and Time" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
            {/* DECRIPTION */}
              <div className="mb-5"> Description
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <textarea type="text" value={addData.description} onChange={e => handleEventsData("description", e)} placeholder="Description" id="small-input" className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              
              {/* PASSWORD */}
              <div>
              <label htmlFor="password"></label>
              <input type="text" value={addData.password} onChange={e => handleEventsData("password", e)}
                  placeholder="Enter your password"
                  className=" mt-10 mb-10 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2
                  text-black shadow-2xl ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset
                  focus:ring-gray-500 sm:text-sm sm:leading-6"/>

              {/* ADD BUTTON */}
              <button 
                  onClick={handleClick}
                  type="submit"
                  className="  flex-none rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold
                  text-white shadow-2xl hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 
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
