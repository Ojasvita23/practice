import { UserInterface } from "../../components/UsersList/types";
import { capitalizeFirstLetter } from "@/utils/commonFunctions";

const UserThread = ({ userInfo }: { userInfo: UserInterface }) => {
  const { id, firstName, lastName, email, gender } = userInfo || {};

  return (
    <div key={id} className="border-1 border-grey-300 mb-1 p-2">
      <h1>
        Name: {firstName} {lastName}
      </h1>
      <p>Email: {email}</p>
      <p>Gender: {capitalizeFirstLetter(gender)}</p>
    </div>
  );
};

export default UserThread;
