import { useEffect, useState } from "react"
import SearchBox from "./SearchBox";
import {setHeader} from "../util/util";

const LISTS_URL = import.meta.env.VITE_APP_BASE_URL + "/all-events/info";


function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListEvents(prop) {
    const sendEventIdToRightSide = prop.sendEventIdToRightSide;

    const [allEventsList, setAllEventsList] = useState(null)
    const filterd = filterEvents()

    useEffect(() => {
        fetchListEvents()
    }, [])

    async function fetchListEvents() {
        const fetchContent = setHeader('GET');
        const fetched = await fetch(LISTS_URL, fetchContent);
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

    function handleSendEventIdToRightSide(event) {
        sendEventIdToRightSide(event.target.id);
    }

    return (
        <>
            <div>
                {filterd !== null ?
                    filterd.map((event) => {
                        return (
                            <div className="eventTile" key={event.id} id={event.id} onClick={handleSendEventIdToRightSide}>
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