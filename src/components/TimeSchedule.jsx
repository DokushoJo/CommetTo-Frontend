import React, {
	InputHTMLAttributes,
	ReactHTMLElement,
	useEffect,
	useState,
} from "react";

const TimeSchedule = (prop) => {
	const [indexInList, setIndexInList] = useState(prop.index)

	return (
		<>
			<div
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<div className="relative">
					<div className="space-x-2 flex items-center">
						<input
							type="time"
							id="time"
							className="w-16 block rounded-m border-slate-300 shadow-sm"
							min="00:00"
							max="24:00"
							value={prop.time}
							onChange={(e) => { prop.handleOnChangeTime(e, indexInList) }}
							required
						/>
						<input
							className="w-20 block rounded-m border-slate-300 shadow-sm"
							value={prop.title}
							onChange={(e) => { prop.handleOnChangeTitle(e, indexInList) }}
						/>
						<input
							className="w-28 block rounded-m border-slate-300 shadow-sm"
							value={prop.description}
							onChange={(e) => { prop.handleOnChangeDescription(e, indexInList) }}
						/>
					</div>
					<p onClick={() => { prop.deleteSchedule(indexInList) }} className="absolute right-0 top-0 text-red-600">Delete</p>
				</div>
			</div>
		</>
	);
};

export default TimeSchedule;
