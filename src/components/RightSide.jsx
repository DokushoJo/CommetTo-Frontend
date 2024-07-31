import { useState } from 'react'

export default function RightSide() {

    const [lightModeEnabled, setLightModeEnabled] = useState(false)

    function changeColorToLightMode() {
        // code that gives light css
    }

    return (
        <>
            <div className=" w-4/6 border shadow-lg shadow-gray-600 border-white bg-black text-white">
                Right Side
                <div className='m-28 h-60 border shadow-lg shadow-gray-600 rounded-2xl border-white bg-gray-900'>Name Date Description</div>
                <div className='m-28 h-96 border shadow-lg shadow-gray-600 rounded-2xl border-white bg-gray-900'>Time Schedule</div>
            </div>
        </>
    )
}