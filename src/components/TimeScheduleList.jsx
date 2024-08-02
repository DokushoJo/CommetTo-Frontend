import React, { ReactElement, useEffect, useState } from "react";
import TimeSchedule from "./TimeSchedule";
import { Schedule } from "../global";

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
			<div className="grid-cols-1">
				{scheduleListComponents}
				{isEditActive ? <p onClick={handleAddSchedule}>Add</p> : <p></p>}
			</div>
		</>
	);
};

export default TimeScheduleList;
