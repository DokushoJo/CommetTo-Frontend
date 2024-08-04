import React, { useEffect, useState } from 'react'
import axios from 'axios'


const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

export function Edit() {
//useState

const [editButton, setEditButton] = useState('Save');  
const [post, setPost] = useState({
    name: '',
    time: '',
    description: '',
  });


//useEffect

//handler functions

// checks password

const handleClick =  () => {
    setEditButton(editButton === 'Save' ? ' Edit Saved' : 'Saved');
}

useEffect(() => {
},[])

const handleInput = (key, e) => {
    e.preventDefault();
    const value = e.target.value;
    const newPost = {...post, [key]: value}
    setPost(newPost)
}

const handleSubmitData = async (e) => {
    e.preventDefault();

    const userData = {
        name: post.name,
        description: post.description,
        time: post.time,
      };

      //check if all inputs are filled
      if(!post.name || !post.description || !post.time){
        console.log('Input required!')
        return;
    }
      console.log(userData)

    
    await axios.put(BACKEND_URL , userData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}


//JSX return 

  return (
    <>

    {/* Add and input data */}

    <div> 
    <div className='w-96 container-add flex-row justify-self-center  h-auto rounded-lg dark:bg-gray-100 p-10 shadow-2xl'>
    <h1 className='text-center mt-3 mb-8 font-extrabold text-[#2d7fa3] text-3xl'>Edit Event</h1>
         
         <form onSubmit={handleSubmitData}>
              {/* EVENTNAME */}
              <div className="mb-5" > 
                  <h1  className='float-left mb-2'>Name</h1>
                  <label htmlFor="event-name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={post.name} onChange={e => handleInput("name", e)} placeholder="Event Name" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
              {/* SCHEDULE */}
              <div className="mb-5"> 
                  <h1 className='float-left mb-2'>Schedule</h1>
                  <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <input type="text" value={post.time} onChange={e => handleInput("time", e)}  placeholder="Date and Time" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            
            {/* DECRIPTION */}
              <div className="mb-5"> 
                  <h1 className='float-left mb-2'>Description</h1>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"></label>
                  <textarea type="text" value={post.description} onChange={e => handleInput("description", e)}  placeholder="Description" id="small-input" className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              

              {/* EDIT BUTTON */}
              <div>
              <button 
                  onClick={handleClick}
                  type="submit"
                  className="mt-3 ml-24 select-none rounded-lg bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-cyan-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  w-32 flex-none 
                  hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-cyan-700">
                  {editButton}
              </button>
              </div>    

        </form>
        </div>
      </div>
  </>

  )
}