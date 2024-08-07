import { useEffect, useState } from "react";
import * as React from "react";
import "./ListEvents.css";
import { setHeader, sessionData } from "../util/util";
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const LISTS_URL = import.meta.env.VITE_APP_BASE_URL + "/all-events/info";

export default function ListEvents(prop) {
  function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
  }

  const [allEventsList, setAllEventsList] = useState(null);
  const [likesCount, setLikesNumber] = useState(0);
  const [deleteEvent, setDeleteEvent] = useState(null);
  const filterd = filterEvents();

  useEffect(() => {
    fetchListEvents();
  }, []);

  useEffect(() => {
    handleDelete();
  }, []);

  async function fetchListEvents() {
    const user_id = sessionData("id").id;
    const fetchContent = setHeader("GET");
    const fetched = await fetch(LISTS_URL + `/${user_id}`, fetchContent);
    const createdIdInUint8Arr = [];
    for await (let chunk of fetched.body) {
      createdIdInUint8Arr.push(chunk);
    }
    const converted = Decodeuint8arr(createdIdInUint8Arr[0]);
    const eventsJSONList = JSON.parse(converted);
    setAllEventsList(eventsJSONList);
  }

  function filterEvents() {
    if (prop.inputText === "") {
      return allEventsList;
    }
    const filtered = allEventsList.filter((e) => {
      return (
        e.name.toLowerCase().includes(prop.inputText) ||
        e.date.toLowerCase().includes(prop.inputText)
      );
    });
    return filtered;
  }

  const handleDelete = async (id) => {
    (() => setDeleteEvent(id))();
    console.log(deleteEvent);
    try {
      await fetch(VITE_APP_BASE_URL + "event", deleteEvent, {
        headers: {
          Authorization: sessionData().token,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      //   await axios.delete(VITE_APP_BASE_URL + "event", deleteEvent);
    } catch (error) {
      return "Invalid Input";
    }
  };

  function IconDislike(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z" />
      </svg>
    );
  }

  function IconComments(props) {
    return (
      <svg
        viewBox="0 0 640 512"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M208 0c114.9 0 208 78.8 208 176s-93.1 176-208 176c-18.7 0-36.8-2.3-54.1-6.2-30.6 19-74.77 38.2-128.95 38.2-9.98 0-19.02-5.9-22.932-15.1-3.914-9.2-2.025-19.8 4.721-27 .521-.4 22.641-24.5 38.991-56C17.18 255.8 0 217.6 0 176 0 78.8 93.13 0 208 0zm-43.4 298.1c14.6 4.2 29.2 5.9 43.4 5.9 88.2 0 160-57.4 160-128S296.2 48 208 48 48 105.4 48 176c0 35.2 17.71 61.2 32.57 76.9l23.53 24.9-15.79 30.3c-3.57 6-7.58 13.8-11.76 20.4 17.71-5.1 35.15-13 52.15-24.4l16.7-9.5 19.2 3.5zm277-169.9C552 132.4 640 209.5 640 304c0 41.6-17.2 79.8-45.7 109.9 16.3 31.5 38.4 55.6 39 56 6.7 7.2 8.6 17.8 3.8 27-3 9.2-12.1 15.1-22.1 15.1-54.1 0-98.3-19.2-128.9-38.2-17.3 3.9-35.4 6.2-54.1 6.2-82 0-152.9-40.2-186.8-98.5 17.3-2.3 33.9-6.2 49.7-11.6 28 37.2 79 62.1 137.1 62.1 14.2 0 28.8-1.7 43.4-5.9l19.2-3.5 16.7 9.5c17 11.4 34.4 19.3 52.2 24.4-4.2-6.6-8.2-14.4-11.8-20.4l-15.8-30.3 23.5-24.9c14.9-15.6 32.6-41.7 32.6-76.9 0-66.3-63.3-120.9-144.9-127.4l.9-.6c0-16.5-2.2-32.5-6.4-47.8z" />
      </svg>
    );
  }

  function IconClose(props) {
    return (
      <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em" {...props}>
        <path
          fill="currentColor"
          d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
        />
      </svg>
    );
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-[550px_550px_550px] grid-rows-[300px_300px_300px] event-container justify-center gap-12 mt-10">
          {filterd !== null
            ? filterd.map((event) => {
                return (
                  <div
                    className="bg-pink border-solid border-8 border-purple sticky groupTile"
                    key={event.id}
                    id={event.id}
                  >
                    <div className="float-right">
                      <button
                        type="submit"
                        className=""
                        onClick={() => handleDelete(event.id)}
                      >
                        {IconClose()}
                      </button>
                    </div>
                    <br />

                    <div className="">
                      <h2 className="text-yellow text-center text-2xl font-bold leading-9 tracking-tight">
                        {event.name}
                      </h2>
                      <br />
                      <p className="text-center">{event.description}</p>
                      <br />
                    </div>
                    <br />
                    <div className="">
                      <div className="flex flex-column gap-96 absolute inset-x-0 bottom-2 left-3">
                        <span>{IconComments()}</span>
                        <span
                          className="flex flex-column gap-1"
                          onClick={() => setLikesNumber(likesCount + 1)}
                        >
                          {IconDislike()}
                          {likesCount}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
