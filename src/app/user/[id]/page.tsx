"use client";

import { useParams } from "next/navigation";

import { fetchUserDetails } from "@/lib/features/users/userDetailSlice";
import { UserInterface } from "@/components/UsersList/types";
import useFetchData from "@/hooks/useFetchData";
import { selectUserDetailData } from "@/lib/features/users/userSelectors.ts";
import { capitalizeFirstLetter } from "@/utils/commonFunctions";

const UserDetail = () => {
  const { id } = useParams();

  const {
    data: user,
    loading,
    error,
  } = useFetchData<UserInterface | null>({
    fetchAction: fetchUserDetails,
    selector: selectUserDetailData,
    params: id,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) return <div>No user data available</div>;

  const { firstName, lastName, email, age, gender, address } =
    user as UserInterface;

  const fullAddress =
    address.address +
    ", " +
    address.city +
    ", " +
    address.state +
    ", " +
    address.country;

  return (
    <div key={user.id} className="border-1 border-grey-300 mb-1 p-2">
      <div>User detail:</div>
      <h1>
        Name: {firstName} {lastName}
      </h1>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Gender: {capitalizeFirstLetter(gender)}</p>
      <p>Address: {fullAddress}</p>
    </div>
  );
};

export default UserDetail;
