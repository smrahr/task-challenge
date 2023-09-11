import {useSelector } from "react-redux";
import User from "./User";
import "./users.css";
import { useEffect } from "react";

function Users() {
  const users = useSelector((state) => state.users);

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div className="center users">
      {users.map((user, index) => (
        <User item={user} key={index} index={index} />
      ))}
    </div>
  );
}

export default Users;
