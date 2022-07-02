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

    clearSelectedIngredient(){
        return {
            selectedIngredient:{} 
        };
    },
  },
});


export const updateSelectedIngredient = (ingredient_name) => {
    console.log("adentro de reducer", ingredient_name);
  return async (dispatch) => {
    const updated_ingredients = await ingredientService.getByQuery(ingredient_name);
    dispatch(setSelectedIngredient(updated_ingredients));
  };
};

export const { setSelectedIngredient, clearSelectedIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
