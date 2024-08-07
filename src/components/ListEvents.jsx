import { useEffect, useState } from "react";
import "./ListEvents.css";
import { setHeader, sessionData, formatDate } from "../util/util";
import { Delete } from "./Delete";
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import axios from "axios";

const LISTS_URL = import.meta.env.VITE_APP_BASE_URL + "/all-events/info";

function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListEvents(prop) {
  const [allEventsList, setAllEventsList] = useState(null);
  const filterd = filterEvents();

  useEffect(() => {
    fetchListEvents();
  }, [allEventsList]);

  async function fetchListEvents() {
    const user_id = sessionData("id").id;
    const fetchContent = setHeader("GET");
    const fetched = await fetch(LISTS_URL + `/${user_id}`, fetchContent);
    const createdIdInUint8Arr = [];
    for await (let chunk of fetched.body) {
      createdIdInUint8Arr.push(chunk);
    }
    const converted = Decodeuint8arr(createdIdInUint8Arr[0]);
    const eventsJSONList = JSON.parse(converted);
    setAllEventsList(eventsJSONList);
  }

  function filterEvents() {
    if (prop.inputText === "") {
      return allEventsList;
    }
    const filtered = allEventsList.filter((e) => {
      return (
        e.name.toLowerCase().includes(prop.inputText) ||
        e.date.toLowerCase().includes(prop.inputText)
      );
    });
    return filtered;
  }

  const [deleteEvent, setDeleteEvent] = useState(null);

  useEffect(() => {
    handleDelete();
  }, []);

  const handleClick = (id) => {
    setDeleteEvent(id);
    console.log(deleteEvent);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(deleteEvent);
    try {
      await fetch(VITE_APP_BASE_URL + "event", deleteEvent, {
        headers: {
          Authorization: sessionData().token,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      //   await axios.delete(VITE_APP_BASE_URL + "event", deleteEvent);
    } catch (error) {
      return "Invalid Input";
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-[500px_500px_500px] grid-rows-[300px_300px_300px] event-container justify-center gap-20 mt-10">
          {filterd !== null
            ? filterd.map((event) => {
                return (
                  <div className="groupTile" key={event.id} id={event.id}>
                    <div className="float-right">
                      <form onSubmit={(e) => handleDelete(e)}>
                        <button
                          type="submit"
                          className=""
                          onClick={() => handleClick(event.id)}
                        >
                          x
                        </button>
                      </form>
                    </div>
                    <br />
                    <div className="flex flex-column">
                      Group name: {event.name} <br />
                      Members: {formatDate(event.date)} <br />
                      Description: {event.description}
                      <br />
                    </div>
                    <br />
                    <div className="inset-x-0 bottom-0">
                      <span>comment</span>
                      <span>dislike</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
