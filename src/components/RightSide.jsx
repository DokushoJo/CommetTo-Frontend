import { useState } from 'react'
import "./RightSide.css"
import InitialView from './InitialView'

export default function RightSide() {

    const [currentView, setCurrentView] = useState(<InitialView/>)

    return (
        <>
            <div className="w-full h-screen overflow-auto border-l border-white bg-black text-white">
                Right Side
                {currentView}
            </div>
        </>
    )
}