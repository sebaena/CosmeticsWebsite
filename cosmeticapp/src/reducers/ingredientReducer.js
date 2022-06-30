import { createSlice } from "@reduxjs/toolkit";
import ingredientService from "../services/ingredient";

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    selectedIngredient:{}
  },
  reducers: {
    
    setSelectedIngredient(state, action) {
      return {
        selectedIngredient: action.payload
      };
    },
  },
});

// export const initializeCosmetics = () => {
//   return async (dispatch) => {
//     const all_cosmetic_ids = await ingredientService.getAllIds();
//     const first_cosmetic = await ingredientService.getOne(all_cosmetic_ids[0].id);

//     const init_cosmetic = {
//       allCosmeticIds: all_cosmetic_ids,
//       currentCosmetic: first_cosmetic,
//     };

//     dispatch(initalCosmetics(init_cosmetic));
//   };
// };

export const updateSelectedIngredient = (ingredient_name) => {
    console.log("adentro de reducer", ingredient_name);
  return async (dispatch) => {
    const updated_ingredients = await ingredientService.getByQuery(ingredient_name);
    dispatch(setSelectedIngredient(updated_ingredients));
  };
};

// export const updateAllCosmeticIds = () => {
//   return async (dispatch) => {
//     const all_cosmetic_ids = await ingredientService.getAllIds();
//     dispatch(setAllCosmeticIds(all_cosmetic_ids));
//   };
// };

// export const nextCosmetic = () => {
//   return async (dispatch, getState) => {
//     const { allCosmeticIds, currentCosmetic } = getState().cosmetic;
//     const index = allCosmeticIds.findIndex((idObject) => {
//       return idObject.id == currentCosmetic.id;
//     });
//     const nextIndex = index == allCosmeticIds.length - 1 ? 0 : index + 1;
//     const next_cosmetic = await ingredientService.getOne(
//       allCosmeticIds[nextIndex].id
//     );
//     dispatch(setCurrnetCosmetic(next_cosmetic));
//   };
// };

export const { setSelectedIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
