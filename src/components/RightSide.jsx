import { useEffect, useRef, useState } from "react";
import "./RightSide.css";
import ListEvents from "./ListEvents";
import AddNewEvent from "./AddNewEvent";

export default function RightSide() {
  // useStates
  const [inputText, setInputText] = useState("");
  const [dialogContent, setDialogContent] = useState(null);

  const dialogRef = useRef(null);
  const toggleAdd = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  return (
    <>
      {/* Add Event Button Dialog box */}

      <div className="flex-col w-full h-screen overflow-auto border-l border-black">
        <ListEvents {...{ inputText }} />
      </div>
      <div className="floating-button-div">
        <button
          className="fb"
          onClick={() => {
            setDialogContent(<AddNewEvent />);
            toggleAdd();
          }}
        >
          +
        </button>
      </div>
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
    </>
  );
}
