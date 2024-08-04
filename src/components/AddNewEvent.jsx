import { useRef, useState } from "react";
import axios from "axios";
import TimeScheduleList from "./TimeScheduleList";
import { sessionData, setHeader } from "../util/util";

const BACKEND_URL =
	import.meta.env.VITE_APP_BASE_URL;

export default function AddNewEvent() {
	const [addData, setAddData] = useState({
		name: "",
		date: "",
		description: "",
	});

	const shcedulesRef = useRef(null)

	const handleEventsData = (key, e) => {
		e.preventDefault();
		const value = e.target.value;
		const newData = { ...addData, [key]: value };
		setAddData(newData);
	};

	const handleSumbitData = async (e) => {
		const postObj = {
			"overview": {
				"name": addData.name,
				"description": addData.description,
				"date": new Date(addData.date),
				"updated_at": new Date()
			},
			"user_id":sessionData("id").id,
			"schedule": getChildState().map((element) => {
				return {
					"name": element.title,
					"time": new Date(addData.date + ":" + element.time),
					"description": element.description
				}
			}),
		}
		e.preventDefault();
		const message = setHeader("POST", postObj);
		const response = await fetch(BACKEND_URL + "/event", message).then((res) => {
			alert("Saved!");
		});
	};

	function getChildState() {
		const childState = shcedulesRef.current.getScheduleColumn()
		return childState;
	}

	return (
		<>
			<div>
				<div className='w-96 container-add flex-row justify-self-center  h-auto rounded-lg dark:bg-gray-100 p-10 shadow-2xl'>
					<h1 className='text-center mt-3 mb-8 font-extrabold text-[#ecb731] text-3xl'>Add Event</h1>
					

					<form onSubmit={handleSumbitData}>
						<div className="mb-5">
							<h1 className="float-left mb-2">Name</h1>
							<label
								htmlFor="event-name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
							></label>
							<input
								type="text"
								value={addData.name}
								onChange={(e) => handleEventsData("name", e)}
								required
								placeholder="Event Name"
								id="small-input"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>

						<div className="mb-5">
							<h1 className="float-left mb-2">Date</h1>
							<label
								htmlFor="event-name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
							</label>
							<input
								type="date"
								value={addData.date}
								onChange={(e) => handleEventsData("date", e)}
								required
								placeholder="Event Date"
								id="small-input"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>

						<h1 className=" mb-6 h-2">Schedule</h1>
						<div className="mb-5">
							<div>
								<TimeScheduleList isEditActive={true} ref={shcedulesRef}
								></TimeScheduleList>
							</div>
						</div>

						<div className="mb-5">
							<h1 className="float-left mb-2">Description</h1>
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
							></label>
							<textarea
								type="text"
								value={addData.description}
								onChange={(e) => handleEventsData("description", e)}
								required
								placeholder="Description"
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
								className="mt-3 ml-8 select-none rounded-lg bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-amber-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none  hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
							>
							Save</button>
						</div>	
					</form>
				</div>
			</div>
		</>
	);
}
