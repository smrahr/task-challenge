import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state, action) => {
      const { name, birthDate, skills, index } = action.payload;
      state.users[index] = { name, birthDate, skills };
    },
    deleteUser: (state, action) => {
      console.log('del2')

      state.users.splice(action.payload, 1);
    },
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
