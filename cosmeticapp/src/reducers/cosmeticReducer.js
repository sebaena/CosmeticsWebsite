import { createSlice } from "@reduxjs/toolkit";
import cosmeticService from "../services/cosmetic";
import ingredientService from "../services/ingredient";

const cosmeticSlice = createSlice({
  name: "cosmetics",
  initialState: {
    allCosmeticIdsAndNames: [],
    currentCosmetic: [],
    selectedIngredient: {},
    selectedCosmeticIndex: -1,
    searchedIngredientName: "",
    indexCounter: 0,
  },
  reducers: {
    initalCosmetics(state, action) {
      return action.payload;
    },
    setAllCosmeticIdsAndNames(state, action) {
      return {
        ...state,
        allCosmeticIdsAndNames: action.payload,
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
      // state.indexCounter = action.payload;
      return {
        ...state,
        indexCounter: action.payload,
      };
    },
    setSelectedIngredient(state, action) {
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    },
    setSelectedCosmeticIndex(state, action) {
      return {
        ...state,
        selectedCosmeticIndex: action.payload,
      };
    },
    setSearchedIngredientName(state, action) {
      return {
        ...state,
        searchedIngredientName: action.payload,
      };
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
    const all_cosmetic_ids_names = await cosmeticService.getAllIdsAndNames();
    // console.log("all cosmetics= ", all_cosmetic_ids);
    const first_cosmetic = await cosmeticService.getOne(
      all_cosmetic_ids_names[0].id
    );

    console.log("first cosmetic", first_cosmetic);

    const init_cosmetic = {
      allCosmeticIdsAndNames: all_cosmetic_ids_names,
      currentCosmetic: [first_cosmetic],
      indexCounter: 0,
    };

    dispatch(initalCosmetics(init_cosmetic));
  };
};

export const findCosmeticById = (id) => {
  return async (dispatch) => {
    const found_cosmetic = await cosmeticService.getOne(id);
    dispatch(setCurrnetCosmetic(found_cosmetic));
  };
};

export const findCosmeticByName = (name) => {
  return async (dispatch) => {
    if (name.length < 2) {
      dispatch(setCurrnetCosmetic([]));
    } else {
      const found_cosmetic = await cosmeticService.getByName(name);
      dispatch(setCurrnetCosmetic(found_cosmetic));
    }
  };
};

export const findCosmeticByIngredient = (ingredient) => {
  return async (dispatch) => {
    if (ingredient.length < 2) {
      dispatch(setCurrnetCosmetic([]));
    } else {
      const found_cosmetic = await cosmeticService.getByIngredient(ingredient);
      dispatch(setCurrnetCosmetic(found_cosmetic));
    }
  };
};

export const updateAllCosmeticIdsAndNames = () => {
  return async (dispatch) => {
    const all_cosmetic_ids_names = await cosmeticService.getAllIdsAndNames();
    dispatch(setAllCosmeticIds(all_cosmetic_ids_names));
  };
};

export const nextCosmetic = () => {
  return async (dispatch, getState) => {
    const { indexCounter, currentCosmetic, allCosmeticIdsAndNames } =
      getState().cosmetic;
    console.log("indexCounter indexCounter= ", indexCounter);
    const nextIndex =
      indexCounter == allCosmeticIdsAndNames.length - 1 ? 0 : indexCounter + 1;

    const next_cosmetic = await cosmeticService.getOne(
      allCosmeticIdsAndNames[nextIndex].id
    );
    console.log("next cosmetic= ", next_cosmetic);
    dispatch(saveIndex(nextIndex));
    dispatch(addCurrentCosmetics(next_cosmetic));
  };
};

export const nextSeveralCosmetics = (n) => {
  return async (dispatch, getState) => {
    for (let i = 0; i < n; i++) {
      const { indexCounter, currentCosmetic, allCosmeticIdsAndNames } =
        getState().cosmetic;
      console.log("indexCounter indexCounter= ", indexCounter);
      const nextIndex =
        indexCounter == allCosmeticIdsAndNames.length - 1
          ? 0
          : indexCounter + 1;
      const next_cosmetic = await cosmeticService.getOne(
        allCosmeticIdsAndNames[nextIndex].id
      );

      dispatch(saveIndex(nextIndex));
      dispatch(addCurrentCosmetics(next_cosmetic));
    }
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
    if (updated_ingredients.length) {
      dispatch(setSelectedIngredient(updated_ingredients[0]));
    }
  };
};

// export const updateSelectedCosmeticName = (cosmetic_name) => {
//   return async (dispatch) => {
//     dispatch(setSelectedCosmeticName(cosmetic_name));
//   }
// }

// export const updateSelectedCosmeticIndex = (index) => {
//   return async (dispatch) => {
//     dispatch(setSelectedCosmeticIndex(index));
//   }
// }

export const {
  initalCosmetics,
  setAllCosmeticIds,
  setCurrnetCosmetic,
  setSelectedIngredient,
  setSelectedCosmeticName,
  setSelectedCosmeticIndex,
  setSearchedIngredientName,
  clearSelectedIngredient,
  addCurrentCosmetics,
  saveIndex,
} = cosmeticSlice.actions;
export default cosmeticSlice.reducer;
