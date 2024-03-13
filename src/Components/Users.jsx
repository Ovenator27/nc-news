import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/SignedInUser";
import { getAllUsers } from "../api";
import UserCard from "./UserCard";

export default function Users() {
  const [usersList, setUsersList] = useState([]);
  const { signedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers().then(({ data: { users } }) => {
      setUsersList(users);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ul className="user-list">
        {usersList.map((user)=> {
            return <UserCard key={user.username} user={user} />
        })}
      </ul>
    </>
  );
}
