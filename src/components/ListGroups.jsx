import { useEffect, useState } from "react";
import "./ListEvents.css";
import { setHeader, sessionData, formatDate } from "../util/util";

const LISTS_URL = import.meta.env.VITE_APP_BASE_URL;

function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListGroups() {
  const [allGroupsList, setAllGroupsList] = useState(null);
  const [memberInGroup, setMemberInGroup] = useState(null);

  useEffect(() => {
    fetchListGroups();
  }, []);

  useEffect(() => {
    fetchListMembers();
  }, [allGroupsList]);

  async function fetchListGroups() {
    const user_id = sessionData("id").id;
    const fetchContent = setHeader("GET");
    const fetched = await fetch(LISTS_URL + `/groups/${user_id}`, fetchContent);
    const fetchedJSON = fetched.json();
    setAllGroupsList(fetchedJSON);
  }

  async function fetchListMembers() {
    const fetchContent = setHeader("GET");
    const groups = await allGroupsList.map((group) =>
      fetch(LISTS_URL + `/users/${group}`, fetchContent)
    );
    const groupsJSON = groups.json();
    setMemberInGroup(groupsJSON);
  }

  return (
    <>
      <div className="">
        {memberInGroup !== null
          ? memberInGroup.map((event) => {
              return (
                <div className="groupTile" key={event.id} id={event.id}>
                  Group name: {event.groupName} <br />
                  Members:{" "}
                  {event.users.map((user) => {
                    if (user.accepted && !user.rejected) {
                      return user.id;
                    }
                  })}{" "}
                  <br />
                  <br />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
