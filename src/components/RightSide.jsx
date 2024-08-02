import { useEffect, useState } from 'react'
import "./RightSide.css"
import InitialView from './InitialView'
import FocusView from './FocusView'

export default function RightSide(prop) {
    const selectedEventId = prop.selectedEventId;

    // useStates
    const [currentView, setCurrentView] = useState(<InitialView/>)

    // useEffects
    useEffect(() => {
        if (selectedEventId !== null) {
            setCurrentView(<FocusView selectedEventId={selectedEventId}/>)
        }
    }, [selectedEventId])

    return (
        <>
            <div className="w-full h-screen overflow-auto border-l border-white bg-black text-white">
                Right Side
                {currentView}
            </div>
        </>
    )
}