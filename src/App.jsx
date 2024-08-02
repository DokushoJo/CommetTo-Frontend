import { useState } from 'react'
import './App.css'
// @ts-ignore
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
	const [selectedEventId, setSelectedEventId] = useState(null)

	// Helper function
	function sendEventIdToRightSide(EventId) {
		setSelectedEventId(EventId);
	}

	return (
		<>
			<div>
				<div className='flex'>
					<div className='h-screen'>
						<LeftSide sendEventIdToRightSide={sendEventIdToRightSide}/>
						<div className='absolute flex settings--width-height bottom-0 text-white tile-bg'>
                    		<div className='m-auto'>Settings</div>
							<div className='m-2 h-20 float-right rounded-lg tile-inner-bg'>
                        		<div className='m-2'>Add Event Button</div>
                    		</div>
                		</div>
					</div>
					<RightSide selectedEventId={selectedEventId}/>
	  			</div>
			</div>
		</>
	)
}

export default App
