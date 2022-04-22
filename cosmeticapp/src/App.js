import { useState, useEffect } from "react";
import axios from "axios";
import Cosmetic from "./components/Cosmetic";
import cosmeticService from "./services/cosmetic";

var db = require("./testdata/db.json");

function App() {
  const [cosmeticsList, setCosmeticsList] = useState();
  const [cosmetic, setCosmetic] = useState(db.cosmeticsList[0]);
  const [itemIndex, setItemIndex] = useState(0);
  const [searchName, setSearchName] = useState("");

  // console.log(cosmeticsList);
  // console.log(ingredientsList);

  const nextItem = () => {
    itemIndex == db.cosmeticsList.length - 1
      ? setItemIndex(0)
      : setItemIndex(itemIndex + 1);
    setCosmetic(db.cosmeticsList[itemIndex]);
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
      <Cosmetic cosmetic={cosmetic} />
    </div>
  );
}

export default App;
