import { useEffect, useState } from "react";
import { sessionData } from "../util/util";

const createNewGroup = async (groupData) => {
  const response = await fetch(BACKEND_URL + `/groups`, {
    headers: {
      Authorization: sessionData().token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(groupData),
  });
  return response.json();
};

const createNewInvite = async (inviteData) => {
  await fetch(BACKEND_URL + "/invitations", {
    headers: {
      Authorization: sessionData().token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(inviteData),
  });
};

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

export default function AddNewGroup() {
  const [addData, setAddData] = useState({
    groupName: "",
    description: "",
  });
  const [newGroup, setNewGroup] = useState({
    group_id: "",
    group_name: "",
    created_by_user: "",
  });
  const [inputText, setInputText] = useState(null);
  const [invite, setInvite] = useState(null);

  const handleGroupsData = (key, e) => {
    const value = e.target.value;
    const newData = { ...addData, [key]: value };
    setAddData(newData);
  };

  const handleSumbitData = async (e) => {
    e.preventDefault();

    const postObj = {
      groupName: addData.groupName,
      description: addData.description,
      created_by_user_id: window.localStorage.getItem("id"),
    };
    e.preventDefault();

    const makeNewGroup = await fetch(BACKEND_URL + `/groups`, {
      headers: {
        Authorization: sessionData().token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postObj),
    });
    const jsonNewGroup = await makeNewGroup.json();
    console.log(jsonNewGroup);
    setNewGroup(jsonNewGroup);
  };
  //   const jsonNewGroup = await createNewGroup(postObj);
  //   console.log(jsonNewGroup)
  //   setNewGroup(jsonNewGroup)
  //   };

  useEffect(() => {
    const newInvite = {
      group_id: newGroup.group_id,
      users: [newGroup.created_by_user_id],
      accepted: true,
      rejected: false,
    };
    const handleNewInvite = async (newGroup) => {
      const makeNewInvite = await fetch(BACKEND_URL + "/invitations", {
        headers: {
          Authorization: sessionData().token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newInvite),
      });
    };
    handleNewInvite();

    if (newGroup && newGroup.group_id) {
      const newInvite = {
        group_id: newGroup.group_id,
        users: [newGroup.created_by_user_id],
        accepted: true,
        rejected: false,
      };
      setInvite(newInvite);
      console.log(newInvite);
    }
  }, [newGroup]);

  useEffect(() => {
    createNewInvite(invite);
  }, [invite]);

  function inputHandler(e) {
    const lowerCase = e.target.value.toLowerCase();
    console.log(lowerCase);
    // search.setInputText(lowerCase)
    setInputText(lowerCase);
  }

  return (
    <>
      <div>
        <div className="w-128 container-add flex-row justify-self-center h-128 rounded-lg dark:bg-purple p-10 shadow-2xl">
          <h1 className="text-center mt-3 mb-8 font-extrabold text-yellow text-3xl">
            Create Group
          </h1>

          <form onSubmit={handleSumbitData}>
            <div className="mb-5">
              <h1 className="float-left mb-2 text-teal">Group Name</h1>
              <label
                htmlFor="event-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <input
                type="text"
                value={addData.groupName}
                onChange={(e) => handleGroupsData("groupName", e)}
                required
                placeholder="Group Name"
                id="small-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <h1 className="float-left mb-2 text-teal">Members</h1>
              <label
                htmlFor="event-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={inputHandler}
                placeholder="Find user"
                id="small-input"
              ></input>
            </div>

            <div className="mb-5">
              <h1 className="float-left mb-2 text-teal">Description</h1>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              ></label>
              <textarea
                type="text"
                value={addData.description}
                onChange={(e) => handleGroupsData("description", e)}
                required
                placeholder="Description"
                id="small-input"
                className="bg-gray-50 border h-36 border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="select-none rounded-lg bg-yellow py-3 px-6 text-center align-middle font-sans text-s font-bold uppercase text-white shadow-md
								 shadow-gray-600/50 transition-all hover:shadow-lg hover:shadow-amber-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
								 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  				w-32 flex-none  hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
