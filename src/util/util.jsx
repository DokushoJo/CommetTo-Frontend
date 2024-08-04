export const sessionData = () => {
	return {
		id: window.localStorage.getItem("id"),
		token: window.localStorage
			.getItem("token")
			.replace('"', "")
			.replace('"', ""),
	};
};

export const setHeader = (method, body) => {
	return {
		headers: {
			Authorization: sessionData().token,
			"Content-Type": "application/json",
		},
		method: method,
		body: JSON.stringify(body),
	};
};

export const formatDate = (dateServer) => {
	const date = new Date(dateServer);
	let datePart = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
		.map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0"))
		.join("/");
	return datePart;
};

export const formatTime = (dateServer) => {
	const date = new Date(dateServer);
	let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()]
		.map((n) => n.toString().padStart(2, "0"))
		.join(":");
	return timePart;
};

export const formatTimeAndDate = (dateServer) => {
	const date = new Date(dateServer);
	return formatDate(dateServer) + " " + formatTime(dateServer);
};
