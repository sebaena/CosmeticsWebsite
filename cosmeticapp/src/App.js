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
  console.log(cosmeticsList[0]);
  console.log(ingredientsList);

  return (
    <div>
      <p>hello cosmetics</p>
      <Cosmetic cosmetic={cosmetic} />
    </div>
  );
}

export default App;
