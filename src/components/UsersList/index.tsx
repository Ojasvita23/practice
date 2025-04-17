"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import UserThread from "../UserInfo";
import SearchInput from "../SearchInput";
import Autocomplete from "../Autocomplete";

import { AppDispatch, RootState } from "@/lib/store";
import { fetchUsers } from "@/lib/features/users/userSlice";
import { genderAutocompleteOptions } from "@/constants/autocompleteOptions";

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setGenderFilter(e.target.value);

  const handleUserClick = (id: string) => {
    router.push(`/user/${id}`);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchValue.toLowerCase());
    const matchesGender =
      genderFilter === "" || user.gender.toLowerCase() === genderFilter;
    return matchesName && matchesGender;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users?.length) return <div>No user data available</div>;

  return (
    <div>
      <h1>Users List</h1>

      <div>
        <SearchInput value={searchValue} onChange={handleSearchChange} />
        <Autocomplete
          value={genderFilter}
          onChange={handleGenderChange}
          options={genderAutocompleteOptions}
        />
      </div>

      {filteredUsers.length ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id.toString())}
            style={{ cursor: "pointer" }}
          >
            <UserThread userInfo={user} />
          </div>
        ))
      ) : (
        <div>No matching users found.</div>
      )}
    </div>
  );
};

export default UsersList;
