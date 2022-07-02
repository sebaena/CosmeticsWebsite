
import { useState, useEffect } from "react";
import cosmeticService from "../services/cosmetic";
import loginService from "../services/login";

  const Login = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);


    useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem(
      "cosmeticAppLoggedInUser"
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
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
      window.localStorage.setItem(
        "cosmeticAppLoggedInUser",
        JSON.stringify(user)
      );
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
    window.localStorage.removeItem("cosmeticAppLoggedInUser");
    setUser(null);
    cosmeticService.setToken("");
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const loggedIn = () => {
    return (
      <div>
        User: {username} is logged in
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  };

return (
    <div>
        <p> LOGIN FORM </p>
    </div>
)


    
  }


  export default Login;