import { useState, useEffect } from "react";
import Ingredient from "./IngredientsList";
import SelectedIngredient from "./SelectedIngredient";
import ingredientService from "../services/ingredient";

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'

// var db = require("../testdata/db.json");

const Cosmetic = (props) => {
  // const { cosmetic } = props;
  // const [ingredientsList, setIngredientsList] = useState();
  const [activeIngredient, setActiveIngredient] = useState({});

  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(initializeCosmetics()); 
  // },[dispatch]) 
  
  const currentCosmetic = useSelector((state)=> state.cosmetic.currentCosmetic);
  
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

  return currentCosmetic ? (
    <div>
      <img src={currentCosmetic.picture} />
      <p>Cosmetic Name : {currentCosmetic.name}</p>
      <p>ingredients:</p>
      <ul>
        {/* {currentCosmetic.ingredients.map((ingredient) => (
          // TODO: <li> click event should pass ingredient name to another component, this component can search and display what does this ingredient do
          <li
            key={ingredient.name}
            // onClick={() => searchIngredientFuc(ingredient.name)}
          >
            {ingredient.name}
          </li>
        ))} */}
      </ul>
      <Ingredient />
      <SelectedIngredient />
    </div>
  ) : (
    <div>Nothing to show</div>
  );
};

export default Cosmetic;
