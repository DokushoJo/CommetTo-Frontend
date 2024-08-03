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
                <div className='flex m-auto mb-5 mx-5 p-3 rounded-lg tile-bg tile-shadow'>
                    <div className='flex'>
                        <img src='./../../images/search_icon.png' className='h-10 pl-2'/>
                        <h3 className='pl-2.5 text-4xl'>Search</h3>
                    </div>
                    <div className='m-auto mt-1'>
                        <SearchBox {...{inputText, setInputText}}></SearchBox>
                    </div>
                </div>
                <div className='m-5 mb-24 pb-0.5 rounded-lg tile-bg tile-shadow'>
                    <div className='m-2 p-3 flex'>
                        <img src='./../../images/event_icon.png' className='h-10'/>
                        <h3 className='pl-3 text-4xl'>Events</h3>
                    </div>
                    <div className='event-box--height-text-size overflow-auto m-2 p-5 rounded-lg tile-inner-bg'>
                        <ListEvents sendEventIdToRightSide={prop.sendEventIdToRightSide} {...{inputText}}/>
                    </div>
                </div>
            </div>
        </>
    )
}