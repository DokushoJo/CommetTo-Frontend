import { useEffect, useState } from "react";
import "./RightSide.css";
import ListEvents from "./ListEvents";

export default function RightSide() {
  // useStates
  const [inputText, setInputText] = useState("");

  return (
    <>
      {/* Add Event Button Dialog box */}

      <div className="flex-col w-full h-screen overflow-auto border-l border-black">
        <ListEvents {...{ inputText }} />
      </div>
      <div className="floating-button-div">
        <button className="fb">+</button>
      </div>
    </>
  );
}
