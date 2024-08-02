import { useEffect, useState } from "react"
import SearchBox from "./SearchBox";

const LISTS_URL = import.meta.env.VITE_APP_LISTS_URL

function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListEvents(prop) {

    const [allEventsList, setAllEventsList] = useState(null)
    const filterd = filterEvents()

    useEffect(() => {
        fetchListEvents()
    }, [])

    async function fetchListEvents() {
        const fetched = await fetch(LISTS_URL);
        const createdIdInUint8Arr = []
        for await (let chunk of fetched.body) {
            createdIdInUint8Arr.push(chunk)
        }
        const converted = Decodeuint8arr(createdIdInUint8Arr[0])
        const eventsJSONList = JSON.parse(converted)
        setAllEventsList(eventsJSONList)
    }

    function filterEvents() {
        if(prop.inputText===""){
            return allEventsList;
        }
        const filtered = allEventsList.filter((e) => {
            return e.name.toLowerCase().includes(prop.inputText) || e.date.toLowerCase().includes(prop.inputText)
        })
        return filtered
    }

    return (
        <>
            This is List for events!
            <div>
                {filterd !== null ?
                    filterd.map((event) => {
                        return (
                            <div className="eventTile" key={event.id}>
                                id: {event.id} <br />
                                name: {event.name} <br />
                                date: {event.date} <br /><br />
                            </div>
                        )
                    }) : null
                }

            </div>
        </>
    )
}