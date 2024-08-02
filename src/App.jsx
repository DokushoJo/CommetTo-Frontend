import { useRef, useState } from 'react'
import './App.css'
// @ts-ignore
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { Save } from './components/Save';
import { Edit } from './components/Edit';

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function App() {
	
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
						<LeftSide/>
						<div className='absolute flex settings--width-height bottom-0 text-white tile-bg'>
                    		<div className='m-auto'>Settings</div>
							<div className='m-2 h-20 float-right rounded-lg tile-inner-bg'>

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

									{/* Edit Event Button Dialog */}
									<div className='m-2'>
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
					
					
					<RightSide/>
					
	  			</div>
			</div>
		</>
	)
}

export default App
