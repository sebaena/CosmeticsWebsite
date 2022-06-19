import { useState, useEffect } from "react";
import Ingredient from "./Ingredient";
import ingredientService from "../services/ingredient";

import { useDispatch } from "react-redux";
import { createCosmetic } from "../reducers/cosmeticReducer";

// var db = require("../testdata/db.json");

const Cosmetic = (props) => {
  const { cosmetic } = props;
  // const [ingredientsList, setIngredientsList] = useState();
  const [activeIngredient, setActiveIngredient] = useState({});

  const dispatch = useDispatch();
  dispatch(createCosmetic());

  const searchIngredientFuc = (name_s) => {
    ingredientService.getByQuery(name_s).then((ingredient) => {
      setActiveIngredient({
        name: ingredient[0].name,
        function: ingredient[0].function,
      });
    });
  };

  // re-render whenever active ingredient changes
  useEffect(() => {}, [activeIngredient]);

  return cosmetic ? (
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
  ) : (
    <div>Nothing to show</div>
  );
};

export default Cosmetic;
