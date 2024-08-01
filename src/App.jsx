import { useState } from "react";
import "./App.css";
import { useState } from "react";
import "./App.css";
// @ts-ignore
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1 className="text-3xl text-cyan-500 font-bold underline">CommetTo</h1>
		</>
	);
}

export default App;
