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
  updateSelectedCosmeticIndex,
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
  const selectedCosmeticIndex = useSelector(
    (state) => state.cosmetic.selectedCosmeticIndex
  );
  const selectedCosmeticName = useSelector(
    (state) => state.cosmetic.selectedCosmeticName
  );
  const selectedIngredient = useSelector(
    (state) => state.cosmetic.selectedIngredient
  );

  const selectedIngredientHandle = (ingredientName) => {
    console.log(props.idx)
    if (
      selectedIngredient &&
      ingredientName == selectedIngredient.name &&
      props.idx == selectedCosmeticIndex
    ) {
      dispatch(updateSelectedIngredient(""));
    } else {
      dispatch(updateSelectedCosmeticIndex(props.idx));
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
          {props.idx == selectedCosmeticIndex &&
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
