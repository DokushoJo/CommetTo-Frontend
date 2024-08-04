import { useEffect, useState, useRef } from "react";
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import "./FocusView.css";
import { formatDate, formatTime, setHeader } from "../util/util";
import { EditEvent } from "./EditEvent.jsx";

export default function FocusView(prop) {
    const selectedEventId = prop.selectedEventId;

    // useStates
    const [currentDisplayEvent, setCurrentDisplayEvent] = useState(null);
    const [dialogContent, setDialogContent] = useState(null); //add button click

    // useEffects
    useEffect(() => {
        if (selectedEventId !== null) {
            changeEventView(selectedEventId);
        }
    }, [selectedEventId]);

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

    async function changeEventView(EventId) {
        const fetchContent = setHeader("GET");
        const fetchedEvent = await fetch(
            VITE_APP_BASE_URL + "/event/" + EventId,
            fetchContent
        );
        const eventJSONParsed = await fetchedEvent.json();
        console.log(eventJSONParsed)
        setCurrentDisplayEvent(eventJSONParsed);
    }

    return (
        <>
            <div className="">
                {currentDisplayEvent !== null ? (
                    <div className="event-Focus" key={currentDisplayEvent.id}>
                        <div className="event-Focus__Overview">
                            <div className="event-Focus__Overview-container">
                                <div className="Overview-title">
                                    <div className="flex mb-4">
                                        <img
                                            src="./../../images/Overview_icon.png"
                                            className="h-12 pl-2"
                                        />
                                        <h3 className="pl-2.5 text-5xl">Overview</h3>
                                    </div>
                                    <div className="event-Focus__Overview-box">
                                        <p>{currentDisplayEvent.overview.name}</p>
                                        <p>{formatDate(currentDisplayEvent.overview.date)}</p>
                                        <p>{currentDisplayEvent.overview.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="event-Focus__Schedule">
                            <div className="event-Focus__Schedule-container">
                                <div className="Schedule-title">
                                    <div className="flex mb-4">
                                        <img
                                            src="./../../images/schedule_icon.png"
                                            className="h-12 pl-2"
                                        />
                                        <h3 className="pl-2.5 text-5xl">Schedule</h3>
                                    </div>
                                    <div className="event-Focus__Schedule-box">
                                        {currentDisplayEvent.schedule.map((timestampSchedule) => {
                                            return (
                                                <div
                                                    className="event-Focus__Schedule-box__Timestamp"
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
                            <div className='ml-96 mb-1 absolute flex settings--width-height bottom-5 rounded-md   select-none  bg-gray-400 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none  hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700'>


                                <button className='ml-1 p-1 mt-1 text-sm' onClick={() => {
                                    setDialogContent(<EditEvent {
                                        ...{selectedEventId: selectedEventId,
                                        currentDisplayEvent: currentDisplayEvent}
                                    } />)
                                    toggleAdd()
                                }}> EDIT EVENT </button>

                                <dialog className='rounded-lg' ref={dialogRef} onClick={(e) => {
                                    if (e.currentTarget === e.target) {
                                        toggleAdd();
                                    }
                                }}>
                                    {dialogContent}</dialog>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
