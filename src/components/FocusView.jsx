import { useEffect, useState, useRef } from "react";
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import "./FocusView.css";
import { formatDate, formatTime, setHeader } from "../util/util";
import { sessionData } from "../util/util";

import { Edit } from "./Edit.jsx";
import { Delete } from "../components/Delete.jsx";

import { EditEvent } from "./EditEvent.jsx";
import axios from "axios";

export default function FocusView(prop) {
  const selectedEventId = prop.selectedEventId;
  const selectEvent = prop.selectEvent;

  // useStates
  const [currentDisplayEvent, setCurrentDisplayEvent] = useState(null);
  const [dialogContent, setDialogContent] = useState(null); //add button click
  const [allEventsList, setAllEventsList] = useState(null);
  const filterd = filterEvents();

  // useEffects
  //   useEffect(() => {
  //     if (selectedEventId !== null) {
  //       changeEventView(selectedEventId);
  //     }
  //   }, [selectedEventId]);

  // Helper functions

  // ADD BUTTON CLICK
  const dialogRef = useRef(null);
  const toggleAdd = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  //   async function changeEventView(EventId) {
  //     const fetchContent = setHeader("GET");
  //     const fetchedEvent = await fetch(
  //       VITE_APP_BASE_URL + "/event/" + EventId,
  //       fetchContent
  //     );
  //     const eventJSONParsed = await fetchedEvent.json();
  //     console.log(eventJSONParsed);
  //     setCurrentDisplayEvent(eventJSONParsed);
  //   }

  //   const filterd = filterEvents();
  //   function filterEvents() {
  //     if (prop.inputText === "") {
  //       return selectEvent;
  //     }
  //     const filtered = selectEvent.filter((e) => {
  //       return (
  //         e.name.toLowerCase().includes(prop.inputText) ||
  //         e.date.toLowerCase().includes(prop.inputText)
  //       );
  //     });
  //     return filtered;
  //   }

  function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
  }

  useEffect(() => {
    fetchListEvents();
  }, []);

  async function fetchListEvents() {
    const user_id = sessionData("id").id;
    const fetchContent = setHeader("GET");
    const fetched = await fetch(
      VITE_APP_BASE_URL + `/${user_id}`,
      fetchContent
    );
    const createdIdInUint8Arr = [];
    for await (let chunk of fetched.body) {
      createdIdInUint8Arr.push(chunk);
    }
    const converted = Decodeuint8arr(createdIdInUint8Arr[0]);
    const eventsJSONList = JSON.parse(converted);
    setAllEventsList(eventsJSONList);
    console.log(converted);
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

  return (
    <>
      {filterd.map((event) => {
        return (
          <div className="groupTile" key={event.id} id={event.id}>
            Group name: {event.name} <br />
            Members: {formatDate(event.date)} <br />
            <br />
          </div>
        );
      })}
      <div className="event-Focus__Schedule">
        <div className="event-Focus__Schedule-container">
          <div className="Schedule-title">
            <div className="flex mb-4">
              <img
                src="./../../images/schedule_icon.png"
                className="ml-2 h-10 pl-2"
              />
              <h3 className="pl-2.5 text-4xl">Schedule</h3>
            </div>
            <div className="event-Focus__Schedule-box">
              {currentDisplayEvent.schedule.map((timestampSchedule) => {
                return (
                  <div
                    className="event-Focus__Schedule-box__Timestamp p-4"
                    key={timestampSchedule.id}
                  >
                    <p>{formatTime(timestampSchedule.time)}</p>
                    <p>{timestampSchedule.name}</p>
                    <p>{timestampSchedule.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-gray-400 py-3 px-4 m-5 text-center align-middle font-sans font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700 text-sm'>"
            onClick={() => {
              setDialogContent(<Edit />);
              toggleAdd();
            }}
          >
            {" "}
            EDIT{" "}
          </button>

          <button
            className="bg-gray-400 py-3 px-4 m-5 text-center align-middle font-sans font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700 text-sm'>"
            onClick={() => {
              setDialogContent(<Delete selectedEventId={selectedEventId} />);
            }}
          >
            {" "}
            DELETE{" "}
          </button>

          <dialog
            className="rounded-lg"
            ref={dialogRef}
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                toggleAdd();
              }
            }}
          >
            {dialogContent}
          </dialog>
        </div>
      </div>
    </>
  );
}
