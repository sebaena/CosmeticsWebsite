import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import cosmeticService from "../services/cosmetic";

const userSlice = createSlice({
  name: "user",
  initialState: {
    errorMessage: "",
    username: "",
    password: "",
    user: {},
  },
  reducers: {
    setErrorMessage(state, action) {
      return {
        ...state,
        errorMessage: action.payload,
      };
    },
    setUsername(state, action) {
      return {
        ...state,
        username: action.payload,
      };
    },
    setPassword(state, action) {
      return {
        ...state,
        password: action.payload,
      };
    },
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

// const loggedUserJSON = window.localStorage.getItem(
//   "cosmeticAppLoggedInUser"
// );

export const setToken = (token) => {
  return async () => {
    cosmeticService.setToken(token);
  };
};

export const UserInit = () => {
  return async (dispatch) => {
    const loggedUserJSON = await window.localStorage.getItem(
      "cosmeticAppLoggedInUser"
    );
    const user = loggedUserJSON != undefined ? JSON.parse(loggedUserJSON) : {};
    if (user && user.token) {
      setToken(user.token);
    }
    dispatch(setUser(user));
  };
};

export const userLogin = () => {
  return async (dispatch, getState) => {
    const { username, password } = getState().user;
    const user = await loginService
      .login({ username, password })
      .then((user) => {
        window.localStorage.setItem(
          "cosmeticAppLoggedInUser",
          JSON.stringify(user)
        );
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error.response.data.error)
        dispatch(setErrorMessage(error.response.data.error));
      });
  };
};

export const userLogout = () => {
  setToken("");
  window.localStorage.removeItem("cosmeticAppLoggedInUser");
  return async (dispatch) => {
    dispatch(setUser({}));
    dispatch(setUsername(""));
    dispatch(setPassword(""));
  };
};

export const { setErrorMessage, setUsername, setPassword, setUser } =
  userSlice.actions;
export default userSlice.reducer;
