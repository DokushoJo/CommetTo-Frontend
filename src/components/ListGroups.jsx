import { useEffect, useState } from "react";
import "./ListEvents.css";
import { setHeader, sessionData, formatDate } from "../util/util";

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;

function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

export default function ListGroups() {
  const [listOfGroupsForUser, setListOfGroupsForUser] = useState([]);
  const [memberInGroup, setMemberInGroup] = useState(null);

  useEffect(() => {
    fetchListOfGroups();
  }, []);

  useEffect(() => {
    fetchListOfMembersInGroup();
  }, [listOfGroupsForUser]);

  async function fetchListOfGroups() {
    const user_id = sessionData("id").id;
    const fetchGroups = await fetch(BACKEND_URL + `/groups/${user_id}`, {
      headers: {
        Authorization: sessionData().token,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const fetchedJSON = await fetchGroups.json();
    if (fetchedJSON.length > 0) {
      const groupIdIndexes = await fetchedJSON.map((obj) => obj.group_id);
      setListOfGroupsForUser(groupIdIndexes);
    }
  }

  function getListOfUserIds(usersArray) {
    const userIds = usersArray.map((group) => {
      if (group.accepted) {
        return group.user_id;
      }
    });
    return userIds;
  }

  async function fetchListOfMembersInGroup() {
    console.log(`Allgroups array is ${listOfGroupsForUser}`);
    const groups = await Promise.all(
      listOfGroupsForUser.map((group) => {
        return fetch(BACKEND_URL + `/users/groups/${group}`, {
          headers: {
            Authorization: sessionData().token,
            "Content-Type": "application/json",
          },
          method: "GET",
        }).then((groupInfo) => groupInfo.json());
      })
    );
    console.log(groups);
    // const groupsJSON = Promise.all(groups.map(async (group) => group.json()));
    // console.log(groupsJSON)
    setMemberInGroup(groups);
  }

  return (
    <>
      <div className="">
        {memberInGroup !== null ? (
          memberInGroup.map((event) => {
            return (
              <div className="groupTile" key={event.groupId} id={event.groupId}>
                Group name: {event.groupName} <br />
                Members:
                {event.users.map((user) => {
                  if (user.accepted && !user.rejected) {
                    return `${user.username} `;
                  }
                })}
                <br />
                <br />
              </div>
            );
          })
        ) : (
          <h1>You're not in any groups. Why not make one?</h1>
        )}
      </div>
    </>
  );
}
