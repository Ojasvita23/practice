"use client";

import { useEffect } from "react";

import UserThread from "../UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { fetchUsers } from "@/lib/features/users/userListCounter";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const count = useSelector((state: RootState) => state.counter.value);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

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
      {users.map((item) => {
        return <UserThread key={item.id} userInfo={item} />;
      })}
    </div>
  );
};
export default UsersList;
