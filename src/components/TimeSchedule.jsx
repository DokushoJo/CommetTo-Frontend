import React, {
	InputHTMLAttributes,
	ReactHTMLElement,
	useEffect,
	useState,
} from "react";

const TimeSchedule = ({ scheduleListComponents, setScheduleListComponents }) => {
	// const TimeSchedule = ({ time, title, description, isEditActive }) => {
	const [time, setTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleOnChangeTime = (e) => {
		const validation = new RegExp(/\d\d:\d\d/g)
		if (e.target.value.match(validation)) {
			console.log(e.target.value);
			setTime(e.target.value);
		}
		console.log(e);
		console.log(e.target.value);
		console.log(time);
	};
	const handleOnChangeTitle = (e) => {
		console.log(e.target.value)
		setTitle(e.target.value);
	};
	const handleOnChangeDescription = (e) => {
		console.log(description);
		setDescription(e.target.value);
	};

	return (
		<>
			<div
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				{/* {isEditActive ? (
					<div className="relative">
						<div className="space-x-2 flex items-center">
							<input
								type="time"
								id="time"
								className="w-16 block rounded-m border-slate-300 shadow-sm"
								min="00:00"
								max="24:00"
								value={actualTime}
								onChange={handleOnChangeTime}
								required
							/>
							<span> - {title}</span>
						</div>
						<p className="absolute right-0 top-0 text-red-600">Delete</p>
					</div>
				) : (
					<>
						<div className="h-6 text-xl">
							{time} - {title}
						</div>
						<div className="">{description}</div>
					</>
				)} */}
				<div className="relative">
					<div className="space-x-2 flex items-center">
						<input
							type="time"
							id="time"
							className="w-16 block rounded-m border-slate-300 shadow-sm"
							min="00:00"
							max="24:00"
							value={time}
							onChange={(e) => { handleOnChangeTime(e) }}
							required
						/>
						<input
							value={title}
							onChange={(e) => { handleOnChangeTitle(e) }}
						/>
						<input
							value={description}
							onChange={() => { handleOnChangeDescription() }}
						/>
					</div>
					<p className="absolute right-0 top-0 text-red-600">Delete</p>
				</div>
			</div>
		</>
	);
};

export default TimeSchedule;
