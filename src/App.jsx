import { useState } from 'react'
import './App.css'
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
						<div className='absolute flex tile-bg Add-Button--size tile-shadow bottom-0'>
                    		<div className='m-auto'>
								<div className='m-2 h-12 rounded-lg tile-shadow'>
                        			<div className='p-3'>Add Button</div>
                    			</div>
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
