import { createContext, useState } from 'react'
import ListEvents from './ListEvents'
import SearchBox from './SearchBox'
import "./LeftSide.css"

export default function LeftSide(prop) {
    const [count, setCount] = useState(0)
    const [inputText, setInputText] = useState("")


    return (
        <>
            <div className='h-screen flex-col overflow-auto leftside--width text-black'>
                <div className='font-bold text-5xl text-center m-16 text-shadow'>CommetTo ☄️</div>
                <div className='block m-auto mb-20 p-3 w-80 rounded-lg text-center tile-bg tile-shadow'>Search
                    <SearchBox {...{inputText, setInputText}}></SearchBox>
                </div>
                <div className='m-5 mb-24 pb-0.5 rounded-lg tile-bg tile-shadow'>
                    <div className='m-2 p-5'>Events</div>
                    <div className='event-box--height-text-size overflow-auto m-2 p-5 rounded-lg tile-inner-bg'>
                        <ListEvents sendEventIdToRightSide={prop.sendEventIdToRightSide} {...{inputText}}/>
                    </div>
                </div>
            </div>
        </>
    )
}