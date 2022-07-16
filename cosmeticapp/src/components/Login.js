import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setUsername,
  setPassword,
  userLogin,
  userLogout,
  UserInit,
} from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const errorMessage = useSelector((state) => state.user.errorMessage);

  useEffect(() => {
    dispatch(UserInit());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(userLogin());
  };

  const handleLogout = (event) => {
    dispatch(userLogout());
  };

  const loginForm = () => {
    return (
      <div>
        <div className="login-form-label">
          <h2>Log in</h2>
        </div>
        <div className="login-form-label">
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <div style={{ marginBottom: "0.5rem" }}>username</div>
            <input
              className="login-form-input"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
            <div style={{ marginBottom: "0.5rem" }}>password</div>
            <input
              className="login-form-input"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <button className="login-form-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  };

  const loggedIn = () => {
    return (
      <div>
        <div className="login-form-label">
          <div style={{ marginBottom: "1rem" }}>
            User: <strong>{user.username}</strong>
          </div>
          <div style={{ marginBottom: "0.5rem", color: "green" }}>
            statue: is logged in
          </div>
          <button className="login-form-button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    );
  };

  return (
    <div className="login-page-container">
      {user && user.token ? loggedIn() : loginForm()}
    </div>
  );
};

export default Login;
