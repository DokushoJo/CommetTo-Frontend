import { useState } from 'react'

export default function InitialView() {

    return (
        <>
            <div className="w-full h-screen overflow-auto border-l border-black">
                <div className='mx-72 my-24 p-10 text-8xl text-center rounded-lg border-white tile-bg'>UPCOMING</div>
                <div className='flex justify-center m-28 h-96 rounded-lg tile-bg'>
                    <div className='p-20'>Title</div>
                    <div className='p-20'>Date</div>
                    <div className='p-20'>Description</div>
                </div>
            </div>
        </>
    )
}