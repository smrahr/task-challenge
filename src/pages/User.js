import { useDispatch, useSelector } from "react-redux";
import "./users.css";
import { useEffect, useState } from "react";
import { deleteUser, addUser, editUser } from "../redux/slices/userSlice";

import * as dayjs from "dayjs";
import "./user.css";

const skillsName = ["HTML", "CSS", "JS"];

function User({ item, index }) {
  const [name, setName] = useState(item.name);
  const [birthDate, setBirthDate] = useState(item.birthDate);
  const [showSkills, setShowSkills] = useState(false);
  const [skills, setSkills] = useState(item.skills || []);

  const dispatch = useDispatch();

  const addToSkills = (newSkill) => {
    if (!skills.includes(newSkill)) {
      const newSkills = [...skills, newSkill];
      setSkills(newSkills);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(editUser({ index, name, birthDate, skills }));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    console.log(index,'del1')
    dispatch(deleteUser(index));
  };

  return (
    <div className="user-wrapper" onClick={(e) => setShowSkills(false)}>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <div className="skills-box">
          <input
            type="text"
            value={skills?.join(",")}
            onClick={(e) => {
              e.stopPropagation();
              setShowSkills(true);
              setSkills([]);
            }}
          />
          {showSkills && (
            <ul className="skills-option">
              {skillsName.map((skill, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToSkills(skill);
                    
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" onClick={(e) => handleAddUser(e)}>
          Edit User
        </button>

        <button type="submit" onClick={(e) => handleDeleteUser(e)}>
          Delete User
        </button>
      </form>
    </div>
  );
}

export default User;
