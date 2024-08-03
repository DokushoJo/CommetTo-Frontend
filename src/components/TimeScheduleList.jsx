import { useState } from "react";
import TimeSchedule from './TimeSchedule'

const TimeScheduleList = ({ scheduleList, isEditActive }) => {
	const [scheduleListComponents, setScheduleListComponents] = useState([]);
	const [scheduleColumn, setScheduleColumn] = useState([]);

	const scheduleRow = (key) => {
		return (<TimeSchedule key={key}></TimeSchedule>)
	}

	const handleAddSchedule = (key) => {
		console.log("Add");
		setScheduleColumn([...scheduleColumn, scheduleRow(key)]);
	};

	return (
		<>
			<div
				className="grid-cols-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				{scheduleColumn.map((s) => {
					return s;
				})}
				<p onClick={() => { handleAddSchedule(scheduleColumn.length) }} className="text-green-600 w-8">
					Add
				</p>
			</div>
		</>
	);
};

export default TimeScheduleList;
