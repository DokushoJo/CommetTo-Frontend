import { useEffect, useRef, useState } from "react";
import TimeScheduleList from "./TimeScheduleList";
import { sessionData, formatDate} from "../util/util";

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

export default function Comments(props) {
  const filter = props.filterd;
  const id = props.deleteEvent;
  const [sei, setSei] = useState(props.deleteEvent)
  console.log(filter);
  console.log(id);
  

  useEffect(() => {
    const handleFetchComments = async () => {
      const response = await fetch('http://localhost:3100');
      const data = await response.json();
      setNotes(data);
    };

    handleFetchComments();
  }, []);


  const [addData, setAddData] = useState({
    name: "",
    date: "",
    description: "",
  });


  const shcedulesRef = useRef(null);

  const handleEventsData = (key, e) => {
    e.preventDefault();
    const value = e.target.value;
    const newData = { ...addData, [key]: value };
    setAddData(newData);
  };

 

  const handleSumbitData = async (e) => {
    const postObj = {
      overview: {
        name: addData.name,
        description: addData.description,
        date: new Date(addData.date),
        updated_at: new Date(),
      },
      user_id: window.localStorage.getItem("id"),
      schedule: getChildState().map((element) => {
        return {
          name: element.title,
          time: new Date(addData.date + ":" + element.time),
          description: element.description,
        };
      }),
    };
    e.preventDefault();

    await fetch(BACKEND_URL + `/event`, {
      headers: {
        Authorization: sessionData().token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postObj),
    });
  };

  function getChildState() {
    const childState = shcedulesRef.current.getScheduleColumn();
    return childState;
  }

  return (
    <>
      <div>
        <div className="w-128 container-add flex-row justify-self-center  h-auto rounded-lg dark:bg-purple p-10 shadow-2xl border-8 border-yellow">
          <h1 className="text-center mt-3 mb-8 font-extrabold text-[#ecb731] text-3xl">
            Add Comment
          </h1>
          <form onSubmit={handleSumbitData}>
            <div className="mb-5">
              <h1 className="float-left mb-2">
              {filter !== null
            ? filter.map((event) => {
              return <div className="" >
                     {event.id === id ? "Group Name: " + event.name  : null}
                     <br/>
                     {event.id === id ? "Description: " +  event.description  : null} 
                     <br/>
                     {event.id === id ? "The Big Day: " +  formatDate(event.date)  : null}
              </div>
              })
            : null}
              </h1>
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
                <p className="float-left mb-2"><pre>Spill your Poison!!</pre></p>
              <textarea
                type="text"
                value={addData.description}
                onChange={(e) => handleEventsData("description", e)}
                required
                placeholder="Hold my Drink! I've got something to say!"
                id="small-input"
                className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
            
              <button
                // onClick={() => submitData()}
                type="submit"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="mt-3 ml-8 select-none rounded-lg bg-yellow py-3 px-6 text-center align-middle font-sans text-s font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:pink-bg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none  hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
