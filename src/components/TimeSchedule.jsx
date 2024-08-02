import React, {
	InputHTMLAttributes,
	ReactHTMLElement,
	useEffect,
	useState,
} from "react";

const TimeSchedule = ({ time, title, description, isEditActive }) => {
	const [actualTime, setActualTime] = useState(time.toString());
	const [actualTitle, setActualTitle] = useState(title);
	const [actualDescription, setActualDescription] = useState(description);

	const handleOnChangeTime = (e) => {
		setActualTime(e.target.value);
		console.log(actualTime);
	};

	return (
		<>
			<div className="border-solid border-gray-900 border-2 m-4 h-24 p-2">
				{isEditActive ? (
					<div>
						<div>
							<input
								type="time"
								id="time"
								className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-24"
								min="00:00"
								max="24:00"
								value={actualTime}
								onChange={handleOnChangeTime}
								required
							/>
						</div>
						<div>
							<p className="float-left">{title}</p>
						</div>
					</div>
				) : (
					<>
						<div className="h-6 text-xl">
							{time} - {title}
						</div>
						<div className="">{description}</div>
					</>
				)}
			</div>
		</>
	);
};

export default TimeSchedule;
