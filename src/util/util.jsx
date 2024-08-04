export const sessionData = () => {
    return {
			id: window.localStorage.getItem("id"),
			token: window.localStorage.getItem("token").replace('"',"").replace('"',""),
		};

}

export const setHeader = (method, body) => {
	return {
		headers: {
			"Authorization": sessionData().token,
			"Content-Type": "application/json",
		},
		method: method,
		body: JSON.stringify(body),
	};
}