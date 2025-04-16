"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserThread from "../UserInfo";
import { AppDispatch, RootState } from "@/lib/store";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { fetchUsers } from "@/lib/features/users/userListCounter";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const count = useSelector((state: RootState) => state.counter.value);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-4 p-2 w-full"
        />
      </div>
      {filteredUsers.map((item) => {
        return <UserThread key={item.id} userInfo={item} />;
      })}
    </div>
  );
};
export default UsersList;
