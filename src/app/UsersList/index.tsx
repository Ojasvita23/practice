'use client';
import { useEffect, useState } from "react";
import { UserInterface } from "./types";

const UsersList = () => {

  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const getList = async () => {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      console.log('data = ', data);
      setUsers(data.users);
    }

    getList()
  }, []);

  return (
    <div>{users.map((item) => {
      return (
        <div key={item.id} className="border-1 border-red-300">
          <h1>{item.firstName}</h1>
          <p>{item.lastName}</p>
          <p>{item.email}</p>
        </div>
      )
    })}</div>
  )
}
export default UsersList;