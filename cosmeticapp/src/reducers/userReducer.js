import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const [errorMessage, setErrorMessage] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [user, setUser] = useState(null);

const userSlice = createSlice({
  name: "users",
  initialState: {
    errorMessage: "",
    username: "",
    password: "",
    user: {},
  },
  reducers: {
    initialUser(state, action) {
      return action.payload;
    },
  },
});

export const { initialUser } = userSlice.actions;
export default userSlice.reducer;
