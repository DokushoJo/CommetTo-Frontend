import React, { ReactElement, useEffect, useState } from "react";
import TimeSchedule from "./TimeSchedule";
import { Schedule } from "../global";

type Props = {
	scheduleList: String;
	isEditActive: boolean;
};

const TimeScheduleList: React.FC<Props> = ({ scheduleList, isEditActive }) => {
	const [scheduleListComponents, setScheduleListComponents] = useState<
		ReactElement[]
	>([]);
	const [scheduleListData, setScheduleListData] = useState<Schedule[]>([]);

	useEffect(() => {
		const tempComponents: ReactElement[] = [];
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
		const emptySchedule: Schedule = {
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
