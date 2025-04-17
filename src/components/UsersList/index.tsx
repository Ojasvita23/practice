"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import UserThread from "../UserInfo";
import SearchInput from "../SearchInput";
import Autocomplete from "../Autocomplete";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUsers } from "@/lib/features/users/userSlice";

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

  const genderAutocompleteOptions = [
    { value: "", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div>
      <h1>Users List</h1>
      <div>
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Autocomplete
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          options={genderAutocompleteOptions}
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
