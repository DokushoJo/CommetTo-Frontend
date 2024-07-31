import { useState } from 'react'
import './App.css'
// @ts-ignore
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
  	const [count, setCount] = useState(0)

  	return (
		<>
			<div className='dark'>
				<div className='flex'>
					<LeftSide/>
					<RightSide/>
	  			</div>
			</div>
		</>
  	)
}

export default App
