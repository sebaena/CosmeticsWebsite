//import Ingredient from "./IngredientsList";
//import CosmeticDisplay from "./CosmeticDisplay";
//import SelectedIngredient from "./SelectedIngredient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//import ingredient from "../services/ingredient";
//import { useState } from "react";

import { useState } from "react";
import ingredientService from "../services/ingredient";

import {
  updateSelectedCosmeticName,
  //initializeCosmetics,
  //updateAllCosmeticIds,
  //updateCurrentIndex,
  //updateCurrentCosmetic,
  //nextCosmetic,
  //findCosmetic,
  //clearSelectedIngredient,
  updateSelectedIngredient,
} from "../reducers/cosmeticReducer";

const Cosmetic = (props) => {
  const dispatch = useDispatch();
  const selectedCosmeticName = useSelector(
    (state) => state.cosmetic.selectedCosmeticName
  );
  const selectedIngredient = useSelector(
    (state) => state.cosmetic.selectedIngredient
  );

  const selectedIngredientHandle = (ingredientName) => {
    if (selectedIngredient && ingredientName == selectedIngredient.name && props.cosmetic.name == selectedCosmeticName){
      dispatch(updateSelectedIngredient(""));
    } else {
      dispatch(updateSelectedCosmeticName(props.cosmetic.name));
      dispatch(updateSelectedIngredient(ingredientName));
    }
  };

  return (
    <div className="cosmetic">
      {/* cosmetic image */}
      <img src={props.cosmetic.picture} />
      {/* cosmetic title */}
      <p className="cosmetic-title">{props.cosmetic.name}</p>
      {/* cosmetic ingredients list */}
      {props.cosmetic.ingredients.map((ingredient, index) => (
        <div key={index}>
          <button
            className="button-ingredient"
            key={ingredient.name}
            onClick={() => selectedIngredientHandle(ingredient.name)}
          >
            {ingredient.name}
          </button>
          {/* if seleteted ingredient name is the same as current one then display the feature */}
          {props.cosmetic.name == selectedCosmeticName &&
          selectedIngredient &&
          selectedIngredient.name == ingredient.name ? (
            <div>{selectedIngredient.function}</div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );

  // const dispatch = useDispatch();
  // const currentCosmetic = useSelector((state)=> state.cosmetic.currentCosmetic);
  // return Object.keys(currentCosmetic).length > 0 ?(
  //   <div className="cosmetic-wrapper">
  //       { currentCosmetic.map ((cosmetic, index) =>(
  //         <div className="cosmetic" key={index}>
  //           <CosmeticDisplay current_cosmetic={cosmetic} />
  //           <Ingredient ingredients={cosmetic.ingredients} />
  //         </div>

  //       ))}
  //     {/* <div className="cosmetic">
  //       <CosmeticDisplay />
  //       <Ingredient />
  //     </div>
  //     <div className="cosmetic">
  //       <CosmeticDisplay />
  //       <Ingredient />
  //     </div>
  //     <div className="cosmetic">
  //       <CosmeticDisplay />
  //       <Ingredient />
  //     </div> */}
  //   </div>
  // ) :( <></>)
};

export default Cosmetic;
