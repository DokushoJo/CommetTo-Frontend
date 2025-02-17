import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStroage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useLocalStorage("token", null);
    const [id, setId] = useLocalStorage("id", null);
	const navigate = useNavigate();

	// call this function when you want to authenticate the user
	const login = async (data,id) => {
		setToken(data);
        setId(id);
		navigate("/");
	};

	// call this function to sign out logged in user
	const logout = () => {
		setToken(null);
        setId(null);
		navigate("/login", { replace: true });
	};

	const value = useMemo(
		() => ({
			token,
            id,
			login,
			logout,
		}),
		[token,id]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
