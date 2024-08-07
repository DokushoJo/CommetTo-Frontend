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
      <button type="submit" className="" onClick={handleClick()}>
        {" "}
        DELETE
      </button>
    </form>
  );
}
