export const sessionData = () => {
    return {
			id: window.localStorage.getItem("id"),
			token: window.localStorage.getItem("token"),
		};

}