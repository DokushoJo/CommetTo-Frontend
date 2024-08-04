// src/MainApp.jsx

import { Routes, Route, useRoutes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import HomePage from "./App";

import "./App.css";

// src/App.jsx
// import { Secret } from "./pages/Secret";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={<ProtectedRoute>{<HomePage />}</ProtectedRoute>}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/secret"
					element={
						<ProtectedRoute>
							<p>This is a secret!</p>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
