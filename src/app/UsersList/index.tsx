"use client";

import { useEffect, useState } from "react";

import UserThread from "../UserInfo";
import { UserInterface } from "./types";

const UsersList = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const getList = async () => {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      console.log("data = ", data);
      setUsers(data.users);
    };

    getList();
  }, []);

  return (
    <div>
      {users.map((item) => {
        return <UserThread key={item.id} userInfo={item} />;
      })}
    </div>
  );
};
export default UsersList;
