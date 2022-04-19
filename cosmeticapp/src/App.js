import { useState } from "react";

var cosmeticsList = require("./testdata/cosmetics.json");
var ingredientsList = require("./testdata/ingredients.json");

const Cosmetic = (props) => {
  const { cosmetic } = props;

  return (
    <div>
      <img src={cosmetic.picture} />
      <p>Cosmetic Name : {cosmetic.name}</p>
      <p>ingredients:</p>
      <ul>
        {cosmetic.ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [cosmetic, setCosmetic] = useState(cosmeticsList[0]);
  const [itemIndex, setItemIndex] = useState(0);

  // console.log(cosmeticsList[0]);
  // console.log(ingredientsList);

  const nextItem = () => {
    itemIndex == cosmeticsList.length - 1 ? setItemIndex(0) : setItemIndex(itemIndex + 1);
    setCosmetic(cosmeticsList[itemIndex]);
  }
  
  return (
    <div>
      <p>hello cosmetics</p>
      <button onClick={nextItem}>Next Item</button>
      <Cosmetic cosmetic={cosmetic} />
    </div>
  );
}

export default App;
