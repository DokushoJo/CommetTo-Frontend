import { useEffect, useState } from "react"

const LISTS_URL = import.meta.env.VITE_APP_LISTS_URL

function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListEvents(prop) {

    const [allEventsList, setAllEventsList] = useState(null)

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

    return (
        <>
            This is List for events!
            <div>
                {allEventsList !== null ?
                    allEventsList.map((event) => {
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