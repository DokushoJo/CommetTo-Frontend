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
                                <div className='event-Focus__Overview-container'>
                                    <div className='Overview-title'>
                                        <div className='flex mb-4'>
                                            <img src='./../../images/Overview_icon.png' className='h-12 pl-2'/>
                                            <h3 className='pl-2.5 text-5xl'>Overview</h3>
                                        </div>
                                        <div className='event-Focus__Overview-box'>
                                            <p>{currentDisplayEvent.overview.name}</p>
                                            <p>{currentDisplayEvent.overview.date}</p>
                                            <p>{currentDisplayEvent.overview.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='event-Focus__Schedule'>
                                <div className='event-Focus__Schedule-container'>
                                    <div className='Schedule-title'>
                                        <div className='flex mb-4'>
                                            <img src='./../../images/schedule_icon.png' className='h-12 pl-2'/>
                                            <h3 className='pl-2.5 text-5xl'>Schedule</h3>
                                        </div>
                                        <div className='event-Focus__Schedule-box'>
                                            {currentDisplayEvent.schedule.map((timestampSchedule) => {
                                                return (
                                                    <div className="event-Focus__Schedule-box__Timestamp" key={timestampSchedule.id}>
                                                        <p>{timestampSchedule.time}</p>
                                                        <p>{timestampSchedule.name}</p>
                                                        <p>{timestampSchedule.description}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                }
            </div>
        </>
    )
}
