import { useEffect, useState } from "react";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./addUsers.css";


const skillsName = ["HTML", "CSS", "JS"];

function AddUsers() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [skills, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const addToSkills = (newSkill) => {
    if (!skills.includes(newSkill)) {
      const newSkills = [...skills, newSkill];
      setSkills(newSkills);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser({ name, birthDate, skills }));
    setName('');
    setBirthDate('');
    setSkills([])
  };


  return (
    <div className="center" onClick={(e) => setShowSkills(false)}>
      <div className="form-wrapper">
        <form>
          <input
            type="text"
            value={name}
            required
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            value={birthDate}
            required
            placeholder="Enter your email"
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <div className="skills-box">
            <input
              type="text"
              value={skills.join(",")}
              required
              onClick={(e) => {
                e.stopPropagation();
                setShowSkills(true);
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
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
