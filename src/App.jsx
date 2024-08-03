import { useRef, useState } from 'react'
import './App.css'
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { Save } from './components/Save';
import { Edit } from './components/Edit';
import { Login } from './components/Login';
import { Register } from './components/Register';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {

	// Helper function
	function sendEventIdToRightSide(EventId) {
		setSelectedEventId(EventId);
	}

	//UseState
	const [dialogContent, setDialogContent] = useState(null); //add button click
	const [register, setRegister] = useState('login'); //switch form log in to register if no user account
	const [selectedEventId, setSelectedEventId] = useState(null)
	

	//Jsx handle functions

	// ADD BUTTON CLICK
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
		{/* //function to click register new user and already have an account 
		{register === 'login' ? (<Login FormHandle={setRegister}/> ) : (<Register FormHandle={setRegister}/>)};
		*/}
		
			 <div>
				<div className='flex'>
					<div className='h-screen'>
						<LeftSide sendEventIdToRightSide={sendEventIdToRightSide}/>
						<div className='absolute flex tile-bg Add-Button--size tile-shadow bottom-0'>
                    		<div className='m-auto'>
								<div className='m-2 h-12 rounded-lg tile-shadow'>
									{/* Add Event Button Dialog box */}
									<div>
										<button onClick={()=>{
											setDialogContent(<Save />)
											toggleAdd()	}}> ADD EVENT </button>

										<dialog className='rounded-lg' ref={dialogRef} onClick={(e) => {
											if(e.currentTarget === e.target){
												toggleAdd(); }}}>
													{dialogContent}</dialog>
									</div>

										{/* Edit Event Button Dialog box */}
										<div >
										<button onClick={()=>{
											setDialogContent(<Edit />)
											toggleAdd()	}}> EDIT EVENT </button>

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
