import { useEffect, useState } from 'react';
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import './FocusView.css';

export default function FocusView(prop) {
    const selectedEventId = prop.selectedEventId;

    // useStates
    const [currentDisplayEvent, setCurrentDisplayEvent] = useState(null);

    // useEffects
    useEffect(() => {
        if (selectedEventId !== null) {
            changeEventView(selectedEventId);
        }
    }, [selectedEventId])

    // Helper functions
    async function changeEventView(EventId) {
        const fetchedEvent = await fetch(VITE_APP_BASE_URL + "/event/" + EventId);
        const eventJSONParsed = await fetchedEvent.json();
        setCurrentDisplayEvent(eventJSONParsed);
    }

    return (
        <>
            <div className="">
            {currentDisplayEvent !== null ?
                        <div className="event-Focus" key={currentDisplayEvent.id}>
                            <div className='event-Focus__Overview'>
                                OVERVIEW: <br /><br />
                                id: {currentDisplayEvent.overview.id} <br />
                                name: {currentDisplayEvent.overview.name} <br />
                                date: {currentDisplayEvent.overview.date} <br />
                                description: {currentDisplayEvent.overview.description}
                            </div>
                            <div className='event-Focus__Schedule'>
                                SCHEDULE:
                                {currentDisplayEvent.schedule.map((timestampSchedule) => {
                                    return (
                                        <div className="event-Focus__Schedule__Timestamp" key={timestampSchedule.id}>
                                            time: {timestampSchedule.time} <br />
                                            name: {timestampSchedule.name} <br />
                                            description: {timestampSchedule.description} <br /><br />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    : null
                }
            </div>
        </>
    )
}
