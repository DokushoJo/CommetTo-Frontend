import { useRef, useState} from 'react'
import './App.css'
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { Save } from './components/Save';
import { Edit } from './components/Edit';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {sessionData} from "./util/util";
import AddNewEvent from './components/AddNewEvent';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
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

	//UseState
	const [dialogContent, setDialogContent] = useState(null); //add button click
	const [register, setRegister] = useState('login'); //switch form log in to register if no user account
	const [selectedEventId, setSelectedEventId] = useState(null)	

	return (
		<>
		
		{/* //function to click register new user and already have an account 
		{register === 'login' ? (<Login FormHandle={setRegister}/> ) : (<Register FormHandle={setRegister}/>)};
		*/}
		
			 <div>
				<div className='flex'>
					<div className='h-screen'>
						<LeftSide sendEventIdToRightSide={sendEventIdToRightSide}/>
						<div className='ml-72 absolute flex settings--width-height bottom-5 rounded-md   select-none  bg-gray-400 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none  hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700'>

							

								{/* Add Event Button Dialog box */}
								<div >
									<button className='ml-1 p-1 mt-1 text-sm' onClick={()=>{
									setDialogContent(<AddNewEvent />)
									toggleAdd()	}}> ADD EVENT </button>

									<dialog className='rounded-lg' ref={dialogRef} onClick={(e) => {
									if(e.currentTarget === e.target){
										toggleAdd(); }}}>
										{dialogContent}</dialog>
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
