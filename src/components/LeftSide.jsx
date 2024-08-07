import { useState } from "react";
import ListEvents from "./ListEvents";
import SearchBox from "./SearchBox";
import "./LeftSide.css";
import AddNewEvent from "./AddNewEvent";
import logo from "../image/commeto.png";
import logoTwo from "../image/side.png";

import ListGroups from "./ListGroups";

export default function LeftSide() {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <div className="h-screen flex-col overflow-auto leftside--width text-black">
        <div className="flex mt-0 mb-5 mx-5 p-3 rounded-lg tile-bg tile-shadow">
          <div className="flex">
            <img
              src="./../../images/search_icon.png"
              className="h-7 ml-5 pl-2"
            />
            <h3 className="pl-2.5 text-3xl">Search</h3>
          </div>
          <div className="m-auto mt-1">
            <SearchBox {...{ inputText, setInputText }}></SearchBox>
          </div>
        </div>
        <div className="m-5 mb-24 pb-0.5 rounded-lg tile-bg tile-shadow">
          <div className="m-2 p-3 flex">
            <img
              src="./../../images/event_icon.png"
              className="ml-3 mt-2 h-8"
            />
            <h3 className="pl-3 mt-2 text-3xl">Groups</h3>
          </div>
          <div className=" event-box--height-text-size overflow-auto m-2 p-5 rounded-lg tile-inner-bg">
            <ListGroups />
          </div>
        </div>
      </div>
    </>
  );
}
