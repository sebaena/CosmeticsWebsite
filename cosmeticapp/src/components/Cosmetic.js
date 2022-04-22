import { useState, useEffect } from "react";
import axios from "axios";
import Ingredient from "./Ingredient";
import ingredientService from "../services/ingredient";

var db = require("../testdata/db.json");

const Cosmetic = (props) => {
  const { cosmetic } = props;
  const [ingredientsList, setIngredientsList] = useState();
  const [activeIngredient, setActiveIngredient] = useState({});

  const searchIngredientFuc = (name) => {
    const foundIngredientFuc = db.ingredientsList.find(
      (ingredient) => ingredient.name === name
    );
    foundIngredientFuc
      ? setActiveIngredient({
          name: foundIngredientFuc.name,
          function: foundIngredientFuc.function,
        })
      : setActiveIngredient({ name: name, function: "na" });
  };

  useEffect(() => {
    ingredientService.getAll().then((initialIngredients) => {
      console.log(initialIngredients);
      setIngredientsList(initialIngredients);
    });
  }, []);

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
