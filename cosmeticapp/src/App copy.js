import { useState, useEffect } from "react";

import Cosmetic from "./components/Cosmetic";
import NewEntry from "./components/NewEntry";
import DisplayAll from "./components/DisplayAll";
import cosmeticService from "./services/cosmetic";
import loginService from "./services/login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  initializeCosmetics,
  updateAllCosmeticIds,
  updateCurrentIndex,
  updateCurrentCosmetic,
  nextCosmetic,
  findCosmetic,
} from "./reducers/cosmeticReducer";

import {clearSelectedIngredient} from "./reducers/ingredientReducer"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


function App() {

  const dispatch = useDispatch();
 
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const all_cosmetics_cache = useSelector((state)=> state.cosmetic.allCosmeticIds);


  const padding = {
    padding: 5
  }


  // handle searchbox text changes
  const handleSearchBoxChange = async (e) => {
    setSearchName(e.target.value);
    e.preventDefault();
    // search searchbox input text from cosmeticsList, if cosmetic name includes the searchbox text, then display it
    // const foundCosmetic = db.cosmeticsList.find((cosmetic) =>
    //   cosmetic.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );

    var matched = all_cosmetics_cache.find((stored_objs) =>
      stored_objs.name.includes(e.target.value.toLowerCase())
    );

    console.log ("matched= ", matched);

      if (matched) {

        console.log("matched id= ", matched.id);
        dispatch(findCosmetic(matched.id));
        // cosmeticService.getOne(matched.id).then((data) => {
        //   setCosmetic(data);
        //   // dispatch(updateCosmetic(data));
        // });
      } else {
        console.log("item not found");
      }
  };



  useEffect(() => {
    dispatch(initializeCosmetics());
  }, [dispatch]);


  const nextItem = async () => {
    dispatch(nextCosmetic());
    dispatch(clearSelectedIngredient());
  };

 
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

      {user === null ? loginForm() : loggedIn()}

      <label>
        Search Cosmetic:
        <input
          type="text"
          value={searchName}
          onChange={(event) => handleSearchBoxChange(event)}
        ></input>
      </label>

      <button onClick={nextItem}>Next Item</button>
      <Cosmetic />
    </div>
  );
}

export default App;
