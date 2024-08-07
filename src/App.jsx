import { useRef, useState } from "react";
import "./App.css";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import AddNewGroup from "./components/AddNewGroup";
import { useAuth } from "./hooks/useAuth"; //import for logout function
import logo from "./image/logo_small.png";

function App() {
  //variable for logout
  const { logout } = useAuth();

  //UseState
  const [dialogContent, setDialogContent] = useState(null); //add button click
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //Jsx handle functions

  // ADD BUTTON CLICK
  const dialogRef = useRef(null);
  const toggleAdd = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
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
        <div className="flex">
          <div className="h-screen">
            <div className="flex flex-column space-x-60">
              <button
                className="m-3 rounded-md select-none bg-yellow py-2 px-2 text-center align-middle font-sans text-s font-bold uppercase text-white shadow-md
              shadow-pink transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
              w-28 flex-none hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700 logout-button"
                onClick={logout}
              >
                Logout
              </button>
              <img src={logo}></img>
            </div>
            <LeftSide sendEventIdToRightSide={sendEventIdToRightSide} />
            <div
              className="ml-80 mb-10 absolute flex settings--width-height bottom-5 rounded-md   select-none  bg-yellow py-2 px-4 text-center align-middle font-sans text-s font-bold uppercase text-white shadow-md
              shadow-pink transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
              w-32 flex-none  hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
            >
              {/* Add Event Button Dialog box */}
              <div>
                <button
                  className="p-1 mt-1 text-sm shadow-pink "
                  onClick={() => {
                    setDialogContent(<AddNewGroup />);
                    toggleAdd();
                  }}
                >
                  ADD GROUP
                </button>

                <dialog
                  className="rounded-lg"
                  ref={dialogRef}
                  onClick={(e) => {
                    if (e.currentTarget === e.target) {
                      toggleAdd();
                    }
                  }}
                >
                  {dialogContent}
                </dialog>
              </div>
            </div>
          </div>
          <RightSide
            selectedEventId={selectedEventId}
            selectedEvent={selectedEvent}
          />
        </div>
      </div>
    </>
  );
}

export default App;
