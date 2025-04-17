"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserThread from "../UserInfo";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUsers } from "@/lib/features/users/userSlice";
import { useRouter } from "next/navigation";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [searchValue, setSearchValue] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const matchesName = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesGender =
      genderFilter === "" || user.gender.toLowerCase() === genderFilter;
    return matchesName && matchesGender;
  });

  const handleUserClick = (id: string) => {
    router.push(`/user/${id}`);
  };

  return (
    <div>
      <h1>Users List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-4 p-2 w-full"
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="mb-4 p-2 w-full"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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
