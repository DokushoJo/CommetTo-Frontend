import { useRef, useState } from 'react'
import './App.css'
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { Save } from './components/Save';
import { Edit } from './components/Edit';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
	const [selectedEventId, setSelectedEventId] = useState(null)

	// Helper function
	function sendEventIdToRightSide(EventId) {
		setSelectedEventId(EventId);
	}
	
	// ADD BUTTON CLICK
	const [dialogContent, setDialogContent] = useState(null);
	const dialogRef = useRef(null);

	const toggleAdd = () =>  {
		if(!dialogRef.current){
			return;
		}
		dialogRef.current.hasAttribute("open") ? dialogRef.current.close() 
		: dialogRef.current.showModal();
	};


	return (
		<>
			
			<div>
				<div className='flex'>
					<div className='h-screen'>
						<LeftSide sendEventIdToRightSide={sendEventIdToRightSide}/>
						<div className='absolute flex tile-bg Add-Button--size tile-shadow bottom-0'>
                    		<div className='m-auto'>
								<div className='m-2 h-12 rounded-lg tile-shadow'>
										{/* Add Event Button Dialog */}
									<div className='m-2'>
										<button onClick={()=>{
											setDialogContent(<Save />)
											toggleAdd()	}}> ADD EVENT </button>

										<dialog className='rounded-lg' ref={dialogRef} onClick={(e) => {
											if(e.currentTarget === e.target){
												toggleAdd(); }}}>
													{dialogContent}</dialog>
									</div>
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
