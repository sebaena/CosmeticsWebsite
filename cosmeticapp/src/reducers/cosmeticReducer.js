import { createSlice } from "@reduxjs/toolkit";
import cosmeticService from "../services/cosmetic";

const cosmeticSlice = createSlice({
  name: "cosmetics",
  initialState: {
    allCosmeticIds: [],
    currentCosmetic: {},
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
  },
});

export const initializeCosmetics = () => {
  return async (dispatch) => {
    const all_cosmetic_ids = await cosmeticService.getAllIds();
    const first_cosmetic = await cosmeticService.getOne(all_cosmetic_ids[0].id);

    const init_cosmetic = {
      allCosmeticIds: all_cosmetic_ids,
      currentCosmetic: first_cosmetic,
    };

    dispatch(initalCosmetics(init_cosmetic));
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
    const { allCosmeticIds, currentCosmetic } = getState().cosmetic;
    const index = allCosmeticIds.findIndex((idObject) => {
      return idObject.id == currentCosmetic.id;
    });
    const nextIndex = index == allCosmeticIds.length - 1 ? 0 : index + 1;
    const next_cosmetic = await cosmeticService.getOne(
      allCosmeticIds[nextIndex].id
    );
    dispatch(setCurrnetCosmetic(next_cosmetic));
  };
};

export const { initalCosmetics, setAllCosmeticIds, setCurrnetCosmetic } =
  cosmeticSlice.actions;
export default cosmeticSlice.reducer;
