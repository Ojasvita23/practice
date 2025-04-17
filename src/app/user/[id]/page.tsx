"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { RootState } from "@/lib/store";
import { fetchUserDetails } from "@/lib/features/users/userDetailSlice";
import { UserInterface } from "@/components/UsersList/types";
import useFetchData from "@/hooks/useFetchData";

const UserDetail = () => {
  const { id } = useParams();
  const { user, loading, error } = useSelector(
    (state: RootState) =>
      state.userDetail as {
        user: UserInterface | null;
        loading: boolean;
        error: string | null;
      }
  );

  useFetchData(fetchUserDetails, id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) return <div>No user data available</div>;

  const {firstName, lastName, email, age, gender, address} = user;

  const fullAddress = address.address + ', ' + address.city + ', ' + address.state + ', ' + address.country;

  return (
    <div key={user.id} className="border-1 border-grey-300 mb-1 p-2">
      <div>User detail:</div>
      <h1>
        Name: {firstName} {lastName}
      </h1>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Address: {fullAddress}</p>
    </div>
  );
};

export default UserDetail;
