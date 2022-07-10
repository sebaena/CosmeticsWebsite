import { createSlice } from "@reduxjs/toolkit";
import cosmeticService from "../services/cosmetic";
import ingredientService from "../services/ingredient";

const cosmeticSlice = createSlice({
  name: "cosmetics",
  initialState: {
    allCosmeticIds: [],
    currentCosmetic: [],
    selectedIngredient: {},
    selectedCosmeticName: "",
    selectedCosmeticIndex: -1,
    indexCounter: 0,
  },
  reducers: {
    initalCosmetics(state, action) {
      return action.payload;
    },
    setAllCosmeticIds(state, action) {
      return {
        ...state,
        allCosmeticIds: action.payload,
      };
    },

    setCurrnetCosmetic(state, action) {
      return {
        ...state,
        currentCosmetic: action.payload,
      };
    },

    addCurrentCosmetics(state, action) {
      console.log("si entra", action.payload);
      state.currentCosmetic.push(action.payload);
    },

    saveIndex(state, action) {
      state.indexCounter = action.payload;
    },

    setSelectedIngredient(state, action) {
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    },
    setSelectedCosmeticName(state, action){
      return {
        ...state,
        selectedCosmeticName: action.payload,
      }
    },
    setSelectedCosmeticIndex(state, action){
      return {
        ...state,
        selectedCosmeticIndex: action.payload,
      }
    },
    clearSelectedIngredient(state) {
      return {
        ...state,
        selectedIngredient: null,
      };
    },
  },
});

export const initializeCosmetics = () => {
  return async (dispatch) => {
    const all_cosmetic_ids = await cosmeticService.getAllIds();
    console.log("all cosmetics= ", all_cosmetic_ids);
    const first_cosmetic = await cosmeticService.getOne(all_cosmetic_ids[0].id);

    console.log("first cosmetic", first_cosmetic);

    const init_cosmetic = {
      allCosmeticIds: all_cosmetic_ids,
      currentCosmetic: [first_cosmetic],
      indexCounter: 0,
    };

    dispatch(initalCosmetics(init_cosmetic));
  };
};

export const findCosmetic = (id) => {
  return async (dispatch) => {
    const found_cosmetic = await cosmeticService.getOne(id);
    dispatch(setCurrnetCosmetic(found_cosmetic));
  };
};

export const updateAllCosmeticIds = () => {
  return async (dispatch) => {
    const all_cosmetic_ids = await cosmeticService.getAllIds();
    dispatch(setAllCosmeticIds(all_cosmetic_ids));
  };
};

export const nextCosmetic = () => {
  return async (dispatch, getState) => {
    const { indexCounter, currentCosmetic, allCosmeticIds } =
      getState().cosmetic;
    console.log("indexCounter indexCounter= ", indexCounter);
    const nextIndex =
      indexCounter == allCosmeticIds.length - 1 ? 0 : indexCounter + 1;

    const next_cosmetic = await cosmeticService.getOne(
      allCosmeticIds[nextIndex].id
    );
    console.log("next cosmetic= ", next_cosmetic);
    dispatch(saveIndex(nextIndex));
    dispatch(addCurrentCosmetics(next_cosmetic));
  };
};

// export const nextCosmetic = () => {
//   return async (dispatch, getState) => {
//     const { allCosmeticIds, currentCosmetic } = getState().cosmetic;
//     const index = allCosmeticIds.findIndex((idObject) => {
//       return idObject.id == currentCosmetic.id;
//     });
//     const nextIndex = index == allCosmeticIds.length - 1 ? 0 : index + 1;
//     const next_cosmetic = await cosmeticService.getOne(
//       allCosmeticIds[nextIndex].id
//     );
//     console.log("next cosmetic= ", next_cosmetic);
//     dispatch(setCurrnetCosmetic(next_cosmetic));
//   };
// };

export const updateSelectedIngredient = (ingredient_name) => {
  if (ingredient_name == "") {
    return async (dispatch) => {
      dispatch(setSelectedIngredient({}));
    };
  }
  return async (dispatch) => {
    const updated_ingredients = await ingredientService.getByQuery(
      ingredient_name
    );
    if(updated_ingredients.length){
      dispatch(setSelectedIngredient(updated_ingredients[0]));
    }
  };
};

export const updateSelectedCosmeticName = (cosmetic_name) => {
  return async (dispatch) => {
    dispatch(setSelectedCosmeticName(cosmetic_name));
  }
}

export const updateSelectedCosmeticIndex = (index) => {
  return async (dispatch) => {
    dispatch(setSelectedCosmeticIndex(index));
  }
}

export const {
  initalCosmetics,
  setAllCosmeticIds,
  setCurrnetCosmetic,
  setSelectedIngredient,
  setSelectedCosmeticName,
  setSelectedCosmeticIndex,
  clearSelectedIngredient,
  addCurrentCosmetics,
  saveIndex,
} = cosmeticSlice.actions;
export default cosmeticSlice.reducer;
