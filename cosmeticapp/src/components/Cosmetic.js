//import Ingredient from "./IngredientsList";
//import CosmeticDisplay from "./CosmeticDisplay";
//import SelectedIngredient from "./SelectedIngredient";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
//import ingredient from "../services/ingredient";
//import { useState } from "react";
// import { useState } from "react";
// import ingredientService from "../services/ingredient";
// import {
  //updateSelectedCosmeticName,
  //updateSelectedCosmeticIndex,
  //initializeCosmetics,
  //updateAllCosmeticIds,
  //updateCurrentIndex,
  //updateCurrentCosmetic,
  //nextCosmetic,
  //findCosmetic,
  //clearSelectedIngredient,
  // setSelectedCosmeticIndex,
  // updateSelectedIngredient,
// } from "../reducers/cosmeticReducer";
import CosmeticImage from "./CosmeticImage";
import CosmeticTitle from "./CosmeticTitle";
import CosmeticIngredients from "./CosmeticIngredients";

const Cosmetic = (props) => {
  return (
    <div className="cosmetic">
      <CosmeticImage cosmetic={props.cosmetic} />
      <CosmeticTitle cosmetic={props.cosmetic} />
      <CosmeticIngredients cosmetic={props.cosmetic} idx={props.idx}/>
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
