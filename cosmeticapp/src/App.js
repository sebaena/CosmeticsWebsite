import { useState, useEffect } from "react";

import Cosmetic from "./components/Cosmetic";
import NewEntry from "./components/NewEntry";
import DisplayAll from "./components/DisplayAll";
import cosmeticService from "./services/cosmetic";
import loginService from "./services/login";

// var db = require("./testdata/db.json");

function App() {
  const [cosmetic, setCosmetic] = useState();
  const [itemIndex, setItemIndex] = useState(0);
  const [view, setView] = useState("default");
  const [entry, setEntry] = useState(false);
  const [searchName, setSearchName] = useState("");

  // keep all _id returned from the db 
  const [dbids, setDbids] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const nextItem = () => {
    console.log("dbids", dbids);

    cosmeticService.getOne(dbids[itemIndex].id).then(data =>setCosmetic(data));
    itemIndex === dbids.length - 1
      ? setItemIndex(0)
      : setItemIndex(itemIndex + 1);
    setView("default");
  };


    // re-render whenever active ingredient changes
    useEffect(() => {}, [cosmetic]);



  // handle searchbox text changes
  const handleSearchBoxChange = (e) => {
    setSearchName(e.target.value);
    e.preventDefault();
    // search searchbox input text from cosmeticsList, if cosmetic name includes the searchbox text, then display it
    // const foundCosmetic = db.cosmeticsList.find((cosmetic) =>
    //   cosmetic.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );

    var matched = dbids.find(stored_objs => stored_objs.name.includes(e.target.value.toLowerCase()));

    if(matched){
      cosmeticService.getOne(matched.id).then(data =>setCosmetic(data));
    }else{
      console.log("item not found");
    }

  };




  const initializePage = () => {
    var db_ids= [];

    console.log(" run startup procedure");

    // store locally the name and id of items in the data base. This must be updated when new items are added 
    cosmeticService.getAll().then((initialCosmetics) => {

      initialCosmetics.map( all_cosmetics => {
        console.log("initialCosmetics", initialCosmetics);
        db_ids = [...db_ids, {id:all_cosmetics.id, name: all_cosmetics.name.toLowerCase()}];
        return db_ids;
      })

      // update all ids from the data base to local id buffer
      setDbids(db_ids);

      // select default display. could be any but first id is easier. use local array instead of hook to avoid delay issues
      cosmeticService.getOne(db_ids[0].id).then(data =>setCosmetic(data));

    });

  // increment item index counter to take into account the startup
  setItemIndex(1);
    
}



  useEffect(() => {

    // at boot up, store all ids in the data base. This only happens when the program starts
    if(dbids.length === 0){

      initializePage();
    
    }


    
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

  const adminOnlyView = () => {
    return (
      <div>
        <button
          onClick={() => {
            setView("all");
          }}
        >
          Show all
        </button>
        <button
          onClick={() => {
            setView("clear");
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setView("add");
          }}
        >
          Add Entry
        </button>

        {/* {view === "all" && <DisplayAll all_cosmetics={db.cosmeticsList} />} */}
        {view === "default" && <Cosmetic cosmetic={cosmetic} />}
        {view === "add" && <NewEntry />}
        {view === "clear" && (
          <li>Please search for an item or press "next item"</li>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* <Notification message={errorMessage} /> */}

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
     {/* {user === null ? (<Cosmetic cosmetic={cosmetic} />) : adminOnlyView()} */}
     <Cosmetic cosmetic={cosmetic} />
    </div>
  );
}

export default App;
