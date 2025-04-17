import { UserInterface } from "../../components/UsersList/types";
import { capitalizeFirstLetter } from "@/utils/commonFunctions";

const UserThread = ({ userInfo }: { userInfo: UserInterface }) => {
  return (
    <div key={userInfo.id} className="border-1 border-grey-300 mb-1 p-2">
      <h1>
        Name: {userInfo.firstName} {userInfo.lastName}
      </h1>
      <p>Email: {userInfo.email}</p>
      <p>Gender: {capitalizeFirstLetter(userInfo.gender)}</p>
    </div>
  );
};

export default UserThread;
