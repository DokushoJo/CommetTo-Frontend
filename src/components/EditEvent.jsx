import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { TimeScheduleListForEdit } from './TimeScheduleListForEdit';
import { sessionData } from "../util/util"

//Get event data from db based on Id of event
//display all data on popup
//  edit event name, schedule detail
//  delete event itself, each schedule
//  add new event
//when save is pushed, send that input to db

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;
const FETCH_EVENT_URL = import.meta.env.VITE_EXPRESS_BASE_URL + ":" + import.meta.env.VITE_EXPRESS_PORT + "/event"

export function EditEvent(prop) {
  //useState

  const [editButton, setEditButton] = useState('Save');
  const [addData, setAddData] = useState({
    name: "",
    date: "",
    description: "",
  });

  const shcedulesRef = useRef(null)

  const handleEventsData = (key, e) => {
    e.preventDefault();
    const value = e.target.value;
    const newData = { ...addData, [key]: value };
    setAddData(newData);
  };

  const handleSumbitData = async (e) => {
    const postObj = {
      "overview": {
        "id": prop.selectedEventId,
        "name": addData.name,
        "description": addData.description,
        "date": new Date(addData.date),
        "updated_at": new Date()
      },
      "schedule": getChildState().map((element) => {
        return {
          "name": element.title,
          "time": new Date(addData.date + ":" + element.time),
          "description": element.description
        }
      }),
    }
    e.preventDefault();

    await fetch(BACKEND_URL + `/event`,
      {
        headers: {
          Authorization: sessionData().token,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(postObj)
      })
  };

  function getChildState() {
    const childState = shcedulesRef.current.getScheduleColumn()
    return childState;
  }

  const handleClick = () => {
    setEditButton(editButton === 'Save' ? ' Edit Saved' : 'Saved');
  }

  const handleInput = (key, e) => {
    e.preventDefault();
    const value = e.target.value;
    const newPost = { ...post, [key]: value }
    setPost(newPost)
  }


  return (

    <>
      <div>
        <div className="mt-10 mb-16 container-add flex-row justify-self-center ml-72 max-w-md h-auto rounded-lg dark:bg-gray-100 p-10 shadow-2xl">
          <h1 className="mt-3 mb-8 font-extrabold text-[#7a68bf] text-3xl">
            Edit Event
          </h1>

          <form onSubmit={handleSumbitData}>
            <div className="mb-5">
              <h1 className="float-left mb-2">Name</h1>
              <label
                htmlFor="event-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <input
                type="text"
                value={addData.name}
                onChange={(e) => handleEventsData("name", e)}
                required
                placeholder="Event Name"
                id="small-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <h1 className="float-left mb-2">Date</h1>
              <label
                htmlFor="event-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <input
                type="date"
                value={addData.date}
                onChange={(e) => handleEventsData("date", e)}
                required
                placeholder="Event Date"
                id="small-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <h1 className=" mb-6 h-2">Schedule</h1>
            <div className="mb-5">
              <div>
                <TimeScheduleListForEdit prop={{ beforeUpdate: prop.currentDisplayEvent.schedule }} isEditActive={true} ref={shcedulesRef}
                ></TimeScheduleListForEdit>
                {console.log(prop.currentDisplayEvent)}
              </div>
            </div>

            <div className="mb-5">
              <h1 className="float-left mb-2">Description</h1>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <textarea
                type="text"
                value={addData.description}
                onChange={(e) => handleEventsData("description", e)}
                required
                placeholder="Description"
                id="small-input"
                className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className=" select-none rounded-lg bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  w-32 flex-none 
                  hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}