import { forwardRef, useImperativeHandle, useState } from "react";
import TimeSchedule from './TimeSchedule'

// const TimeScheduleList = ({ scheduleList, isEditActive }) => {
const TimeScheduleList = forwardRef(function TimeScheduleList(props, ref) {
	const [scheduleColumn, setScheduleColumn] = useState([]);

	const handleAddSchedule = () => {
		setScheduleColumn([...scheduleColumn, {
			time: `${("0" + new Date().getHours()).slice(-2)}:${("0" + new Date().getMinutes()).slice(-2)}`,
			title: "",
			description: ""
		}]);
	};

	const handleOnChangeTime = (e, index) => {
		const validation = new RegExp(/\d\d:\d\d/g)
		if (e.target.value.match(validation)) {
			const copy = scheduleColumn
			const before = scheduleColumn[index]
			before.time = e.target.value
			setScheduleColumn(copy.slice(0, index).concat(before).concat(copy.slice(index + 1)))
		}
	};
	const handleOnChangeTitle = (e, index) => {
		const copy = scheduleColumn
		const before = scheduleColumn[index]
		before.title = e.target.value
		setScheduleColumn(copy.slice(0, index).concat(before).concat(copy.slice(index + 1)))
	};
	const handleOnChangeDescription = (e, index) => {
		const copy = scheduleColumn
		const before = scheduleColumn[index]
		before.description = e.target.value
		setScheduleColumn(copy.slice(0, index).concat(before).concat(copy.slice(index + 1)))
	};

	const sortSchedules = () => {
		const copy = [...scheduleColumn];
		copy.sort((a, b) => {
			const diff = Number(a.time.split(":")[0]) - Number(b.time.split(":")[0])
				+ Number(a.time.split(":")[1]) / 60 - Number(b.time.split(":")[1]) / 60
			return diff
		})
		setScheduleColumn(copy)
	}

	const deleteSchedule = (index) => {
		const copy = scheduleColumn
		setScheduleColumn(copy.slice(0, index).concat(copy.slice(index + 1)))
	}

	useImperativeHandle(ref, () => ({
		getScheduleColumn: () => {
			return scheduleColumn
		}
	}))

	return (
		<>
			<div
				className="grid-cols-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
				ref={ref}
			>
				{scheduleColumn.map((element, index) => {
					return (<TimeSchedule key={index} {...{
						index: index, title: element.title,
						time: element.time, description: element.description,
						handleOnChangeTime: handleOnChangeTime, handleOnChangeTitle: handleOnChangeTitle,
						handleOnChangeDescription: handleOnChangeDescription,
						scheduleColumn: scheduleColumn, setScheduleColumn: setScheduleColumn,
						deleteSchedule: deleteSchedule
					}}>
					</TimeSchedule>);
				})}
				<div className="flex">
					<p onClick={() => { handleAddSchedule() }} className="text-green-600 w-8">
						Add
					</p>
					<p onClick={() => { sortSchedules() }} className="text-green-600 w-26 pl-5">
						Sort By Time
					</p>
				</div>
			</div>
		</>
	);
});

export default TimeScheduleList;
