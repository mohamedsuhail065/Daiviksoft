import {createSlice} from '@reduxjs/toolkit';
import {getUser, removeUser, saveUser} from '../utils/storage';

const initialState = {
  user: getUser(),
  isAuthenticated: !!getUser(),
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      saveUser(action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    signIn: (state, action) => {
      const savedUser = getUser();
      if (
        saveUser &&
        savedUser.email === action.payload.email &&
        savedUser.password === action.payload.password
      ) {
        state.user = savedUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },
    signOut: state => {
      removeUser();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {signUp, signIn, signOut, clearError} = userSlice.actions;
export default userSlice.reducer;
