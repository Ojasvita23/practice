"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserThread from "../UserInfo";
import { AppDispatch, RootState } from "@/lib/store";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { fetchUsers } from "@/lib/features/users/userSlice";
import { useRouter } from "next/navigation";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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

  const handleUserClick = (id: string) => {
    router.push(`/user/${id}`);
  };

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
        return (
          <div
            key={item.id}
            onClick={() => handleUserClick(item.id.toString())}
            style={{ cursor: "pointer" }}
          >
            <UserThread userInfo={item} />
          </div>
        );
      })}
    </div>
  );
};
export default UsersList;
