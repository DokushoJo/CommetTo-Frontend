import { useState } from "react";
import ListEvents from "./ListEvents";
import SearchBox from "./SearchBox";
import "./LeftSide.css";
import AddNewEvent from "./AddNewEvent";

import ListGroups from "./ListGroups";

export default function LeftSide() {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <div className="h-screen flex-col overflow-auto leftside--width text-black">
        <div className="flex mt-0 mb-5 mx-5 p-3 rounded-lg bg-purple tile-shadow border-solid border-8 border-pink">
          <div className="flex">
            <h3 className="pl-2.5 text-3xl text-yellow text-center font-bold leading-9 tracking-tight">
              Search
            </h3>
          </div>
          <div className="m-auto mt-1">
            <SearchBox {...{ inputText, setInputText }}></SearchBox>
          </div>
        </div>
        <div className="mt-0 mb-5 mx-5 p-3 rounded-lg bg-purple tile-shadow border-solid border-8 border-pink">
          <div className="flex">
            <h3 className="pl-2.5 pb-3 text-3xl text-yellow text-center font-bold leading-9 tracking-tight">
              Groups
            </h3>
          </div>
          <div className=" event-box--height-text-size overflow-auto m-2 p-5 rounded-lg bg-teal">
            <ListGroups />
          </div>
        </div>
      </div>
    </>
  );
}
