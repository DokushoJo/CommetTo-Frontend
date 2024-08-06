import React, { useEffect, useState } from "react";
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import "./delete.css";
import axios from "axios";

export function Delete(prop) {
  const selectedEventId = prop.selectedEventId;

  const [deleteEvent, setDeleteEvent] = useState(null);

  useEffect(() => {
    handleClick();
  });

  const handleClick = (id) => {
    const eventId = id;
    console.log(id);

    setDeleteEvent(eventId);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        VITE_APP_BASE_URL + "event",
        deleteEvent
      );
      console.log(response);
    } catch (error) {
      return "Invalid Input";
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className=" h-10 ml-16 select-none rounded-lg bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-600/50 transition-all hover:shadow-lg
            hover:shadow-red-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
            w-32 flex-none 
            hover:bg-red-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-red-500"
        onClick={handleClick(selectedEventId)}
      >
        {" "}
        DELETE
      </button>
    </form>
  );
}
