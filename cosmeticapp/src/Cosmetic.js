import { useState } from "react";
import Ingredient from "./Ingredient";

var ingredientsList = require("./testdata/ingredients.json");

const Cosmetic = (props) => {
  const { cosmetic } = props;
  const [activeIngredient, setActiveIngredient] = useState({});

  const searchIngredientFuc = (name) => {
    const foundIngredientFuc = ingredientsList.ingredientsList.find(
      (ingredient) => ingredient.name === name
    );
    foundIngredientFuc
      ? setActiveIngredient({
          name: foundIngredientFuc.name,
          function: foundIngredientFuc.function,
        })
      : setActiveIngredient({ name: name, function: "na" });
  };

  return (
    <div>
      <img src={cosmetic.picture} />
      <p>Cosmetic Name : {cosmetic.name}</p>
      <p>ingredients:</p>
      <ul>
        {cosmetic.ingredients.map((ingredient) => (
          // TODO: <li> click event should pass ingredient name to another component, this component can search and display what does this ingredient do
          <li
            key={ingredient.name}
            onClick={() => searchIngredientFuc(ingredient.name)}
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
      <Ingredient ingredient={activeIngredient} />
    </div>
  );
};

export default Cosmetic;
