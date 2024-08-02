import React, { ReactElement, useEffect, useState } from "react";
import TimeSchedule from './TimeSchedule'

const TimeScheduleList = ({ scheduleList, isEditActive }) => {
	const [scheduleListComponents, setScheduleListComponents] = useState([]);
	const [scheduleListData, setScheduleListData] = useState([]);

	useEffect(() => {
		const tempComponents = [];
		console.log("Refresh ");
		for (let i = 0; i < scheduleListData.length; i++) {
			tempComponents.push(
				<TimeSchedule
					time={0}
					title="title"
					description="desc"
					key={i}
					isEditActive={isEditActive}
				></TimeSchedule>
			);
		}
		setScheduleListComponents(tempComponents);
	}, [scheduleListData]);

	useEffect(() => {}, [scheduleListComponents]);

	const handleAddSchedule = () => {
		const emptySchedule = {
			id: 1,
			time: 16,
			name: "A new title",
			description: "A desc",
		};
		setScheduleListData([...scheduleListData, emptySchedule]);
		console.log("Add");
	};

	return (
		<>
			<div
				className="grid-cols-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				{scheduleListComponents}
				{isEditActive ? (
					<p onClick={handleAddSchedule} className="text-green-600">
						Add
					</p>
				) : (
					<p></p>
				)}
			</div>
		</>
	);
};

export default TimeScheduleList;
