import { useState, useEffect } from "react";
import cosmeticService from "../services/cosmetic";
import loginService from "../services/login";
import { useCookies } from "react-cookie";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["cosmeticAppLoggedInUser"]);

  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem(
    //   "cosmeticAppLoggedInUser"
    // );
    if (cookies.cosmeticAppLoggedInUser) {
      const user = JSON.parse(cookies.cosmeticAppLoggedInUser);
      setUser(user);
      cosmeticService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login in with ", username);

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      // window.localStorage.setItem(
      //   "cosmeticAppLoggedInUser",
      //   JSON.stringify(user)
      // );
      setCookie("cosmeticAppLoggedInUser", JSON.stringify(user), { path: "/" });
      cosmeticService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credientials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    // window.localStorage.removeItem("cosmeticAppLoggedInUser");
    removeCookie("cosmeticAppLoggedInUser", { path: "/" });
    setUser(null);
    cosmeticService.setToken("");
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
            <div>username</div>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <div>password</div>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const loggedIn = () => {
    return (
      <div>
        <div className="login-form-label">
          User: <strong>{user.username}</strong> is logged in
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  };

  return (
    <div className="login-page-container">
      {user ? loggedIn() : loginForm()}
    </div>
  );
};

export default Login;
