import { useEffect, useState } from "react";
import "./ListEvents.css";
import { setHeader, sessionData, formatDate } from "../util/util";

const LISTS_URL = import.meta.env.VITE_APP_BASE_URL + "/groups";

function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListGroups(prop) {
  const [allGroupsList, setAllGroupsList] = useState(null);
  const filterd = filterEvents();

  useEffect(() => {
    fetchListGroups();
  }, [allGroupsList]);

  async function fetchListGroups() {
    const user_id = sessionData("id").id;
    const fetchContent = setHeader("GET");
    const fetched = await fetch(LISTS_URL + `/${user_id}`, fetchContent);
    const createdIdInUint8Arr = [];
    for await (let chunk of fetched.body) {
      createdIdInUint8Arr.push(chunk);
    }
    const converted = Decodeuint8arr(createdIdInUint8Arr[0]);
    const eventsJSONList = JSON.parse(converted);
    setAllGroupsList(eventsJSONList);
  }

  function filterEvents() {
    if (prop.inputText === "") {
      return allGroupsList;
    }
    const filtered = allGroupsList.filter((e) => {
      return (
        e.name.toLowerCase().includes(prop.inputText) ||
        e.date.toLowerCase().includes(prop.inputText)
      );
    });
    return filtered;
  }

  return (
    <>
      <div className="">
        {filterd !== null
          ? filterd.map((event) => {
              return (
                <div className="groupTile" key={event.id} id={event.id}>
                  Group name: {event.name} <br />
                  Members: {formatDate(event.date)} <br />
                  <br />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
