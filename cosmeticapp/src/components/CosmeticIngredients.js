import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setSelectedCosmeticIndex,
  updateSelectedIngredient,
} from "../reducers/cosmeticReducer";

const CosmeticIngredients = (props) => {
  const dispatch = useDispatch();
  const selectedCosmeticIndex = useSelector(
    (state) => state.cosmetic.selectedCosmeticIndex
  );
  const selectedIngredient = useSelector(
    (state) => state.cosmetic.selectedIngredient
  );
  const searchedIngredientName = useSelector(
    (state) => state.cosmetic.searchedIngredientName
  );

  const searchedIngredientNameHighlight = (ingredientName) => {
    if (
      searchedIngredientName &&
      ingredientName
        .toLowerCase()
        .includes(searchedIngredientName.toLowerCase())
    ) {
      return "button-ingredient-highlight";
    }
    return "";
  };

  // 1. if ingredient is clicked, save the ingredient name and current cosmetic index
  // into cosmetic reducer. Current cosmetic index is a prop passed from Product componet
  // 2. click the same ingredient second time, save NULL to ingredient name in cosmetic reducer
  const selectedIngredientHandle = (ingredientName) => {
    console.log(props.idx);
    if (
      selectedIngredient &&
      ingredientName == selectedIngredient.name &&
      props.idx == selectedCosmeticIndex
    ) {
      dispatch(updateSelectedIngredient(""));
    } else {
      dispatch(setSelectedCosmeticIndex(props.idx));
      dispatch(updateSelectedIngredient(ingredientName));
    }
  };

  return props.cosmetic.ingredients.map((ingredient, index) => (
    <div key={index}>
      {/* if ingredient name is the same as searchedIngredientName, then hight light the text */}
      <button
        className={`button-ingredient ${searchedIngredientNameHighlight(ingredient.name)}`}
        key={ingredient.name}
        onClick={() => selectedIngredientHandle(ingredient.name)}
      >
        {ingredient.name}
      </button>
      {/* only if selectedCosmeticIndex and selectedIngredient read from store 
      are the same as current component instance, 
      then display the feature of the ingredient */}
      {props.idx == selectedCosmeticIndex &&
      selectedIngredient &&
      selectedIngredient.name == ingredient.name ? (
        <div>{selectedIngredient.function}</div>
      ) : (
        <></>
      )}
    </div>
  ));
};

export default CosmeticIngredients;
