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
  ));
};

export default CosmeticIngredients;
