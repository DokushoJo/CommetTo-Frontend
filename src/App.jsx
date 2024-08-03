import { useRef, useState } from 'react'
import './App.css'
// @ts-ignore
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { Save } from './components/Save';
import { Edit } from './components/Edit';
import { Login } from './components/Login';
import { Register } from './components/Register';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {

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

	// LIST 
	function sendEventIdToRightSide(EventId) {
		setSelectedEventId(EventId);
	}

	return (
		<>
		
		{/* //function to click register new user and already have an account 
		{register === 'login' ? (<Login FormHandle={setRegister}/> ) : (<Register FormHandle={setRegister}/>)};
		*/}
		
			 <div>
				<div className='flex'>
					<div className='h-screen'>
						<LeftSide sendEventIdToRightSide={sendEventIdToRightSide}/>
						<div className='absolute flex settings--width-height bottom-0 text-white tile-bg'>
                    		<div className='m-auto'>Settings</div>
							<div className='m-2 h-20 float-right rounded-lg tile-inner-bg'>

								{/* Add Event Button Dialog box */}
                        		<div >
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
					<RightSide selectedEventId={selectedEventId}/>
	  			</div>
			</div> 
		</>
	

		)	
}

export default App;
