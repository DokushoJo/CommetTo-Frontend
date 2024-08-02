import { useState } from 'react'
import "./LeftSide.css"
import  ListEvents  from './ListEvents'

export default function LeftSide(prop) {
  const [count, setCount] = useState(0)


    return (
        <>
            <div className='h-screen flex-col overflow-auto leftside--width bg-black text-white'>
                Left Side
                <div className='m-5 mb-20 mt-20 pb-1 rounded-lg tile-bg'>
                    <div className='m-2'>Search Box</div>
                    <div className='m-2 rounded-lg tile-inner-bg'>Search</div>
                </div>
                <div className='m-5 pb-0.5 rounded-lg tile-bg'>
                    <div className='m-2'>Events Box</div>
                    <div className='event-box--height-text-size overflow-auto m-2 rounded-lg tile-inner-bg'>
                        <ListEvents sendEventIdToRightSide={prop.sendEventIdToRightSide}/>
                    </div>
                </div>
            </div>
        </>
    )
}
