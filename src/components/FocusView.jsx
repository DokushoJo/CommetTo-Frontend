import { useState, useRef } from "react";
import "./FocusView.css";
import { formatDate, formatTime } from "../util/util";

import { Edit } from "./Edit.jsx";
import { Delete } from "../components/Delete.jsx";

export default function FocusView(prop) {
  const selectedEventId = prop.selectedEventId;
  const selectEvent = prop.selectEvent;

  // useStates
  const [currentDisplayEvent, setCurrentDisplayEvent] = useState(null);
  const [dialogContent, setDialogContent] = useState(null); //add button click

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

  return (
    <>
      {selectEvent.map((event) => {
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
