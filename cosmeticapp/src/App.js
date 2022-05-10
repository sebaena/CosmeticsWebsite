import { useState, useEffect } from "react";

import Cosmetic from "./components/Cosmetic";
import NewEntry from "./components/NewEntry";
import DisplayAll from "./components/DisplayAll";
import cosmeticService from "./services/cosmetic";

var db = require("./testdata/db.json");

function App() {
  const [cosmeticsList, setCosmeticsList] = useState();
  const [cosmetic, setCosmetic] = useState();
  const [itemIndex, setItemIndex] = useState(0);
  const [view, setView] = useState('default');
  const [entry, setEntry] = useState(false);
  const [searchName, setSearchName] = useState("");

  // console.log(cosmeticsList);
  // console.log(ingredientsList);

  const nextItem = () => {
    itemIndex == db.cosmeticsList.length - 1
      ? setItemIndex(0)
      : setItemIndex(itemIndex + 1);
    setCosmetic(db.cosmeticsList[itemIndex]);
    setView("default");
  };


  // handle searchbox text changes
  const handleSearchBoxChange = (e) => {
    setSearchName(e.target.value);
    e.preventDefault();
    // search searchbox input text from cosmeticsList, if cosmetic name includes the searchbox text, then display it
    const foundCosmetic = db.cosmeticsList.find((cosmetic) =>
      cosmetic.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (foundCosmetic) {
      setCosmetic(foundCosmetic);
      setView("default")
    }
  };

  useEffect(() => {
    cosmeticService.getAll().then((initialCosmetics) => {
      console.log(initialCosmetics);
      setCosmeticsList(initialCosmetics);
    });
  }, []);

  return (
    <div>
      <label>
        Search Cosmetic:
        <input
          type="text"
          value={searchName}
          onChange={(event) => handleSearchBoxChange(event)}
        ></input>
      </label>

      <button onClick={nextItem}>Next Item</button>
      <button onClick={()=>{setView("all")}}>Show all</button>
      <button onClick={()=>{setView("clear")}}>Clear</button>
      <button onClick={()=>{setView("add")}}>Add Entry</button>

      { view === "all"     && <DisplayAll all_cosmetics={db.cosmeticsList} /> }
      { view === "default" && <Cosmetic cosmetic={cosmetic} /> }
      { view === "add"     && <NewEntry /> }
      { view === "clear"   && <li>Please search for an item or press "next item"</li> }

    </div>
  );
}

export default App;
