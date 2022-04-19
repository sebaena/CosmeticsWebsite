import { useState } from "react";
import Cosmetic from "./Cosmetic";

var cosmeticsList = require("./testdata/cosmetics.json");
var ingredientsList = require("./testdata/ingredients.json");

function App() {
  const [cosmetic, setCosmetic] = useState(cosmeticsList[0]);
  const [itemIndex, setItemIndex] = useState(0);
  const [searchName, setSearchName] = useState("");

  // console.log(cosmeticsList);
  // console.log(ingredientsList);

  const nextItem = () => {
    itemIndex == cosmeticsList.length - 1 ? setItemIndex(0) : setItemIndex(itemIndex + 1);
    setCosmetic(cosmeticsList[itemIndex]);
  }

  // handle searchbox text changes
  const handleSearchBoxChange = (e) => {
    setSearchName(e.target.value);
    e.preventDefault();
    // search searchbox input text from cosmeticsList, if cosmetic name includes the searchbox text, then display it
    const foundCosmetic = cosmeticsList.find(cosmetic => cosmetic.name.toLowerCase().includes(e.target.value.toLowerCase()));
    if(foundCosmetic){
      setCosmetic(foundCosmetic);
    }
  }

  return (
    <div>
      <label>Search Cosmetic:
        <input type="text" value={searchName} onChange={(event) => handleSearchBoxChange(event)}></input>
      </label>
      <p>hello cosmetics</p>
      <button onClick={nextItem}>Next Item</button>
      <Cosmetic cosmetic={cosmetic} />
    </div>
  );
}

export default App;
