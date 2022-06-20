import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "625da774913c95013ab4b432",
  name: "Lumene Nordic Hydra Cream",
  picture: "pictures/lumene_nordic_hydra_cream.jpeg",
  ingredients: [
    {
      name: "Aqua",
    },
    {
      name: "Caprylic",
    },
    {
      name: "Shea Butter",
    },
    {
      name: "Hydrogenated Polydecene",
    },
    {
      name: "Propanediol",
    },
  ],
};

const cosmeticSlice = createSlice({
  name: "cosmetic",
  initialState,
  reducers: {
    updateCosmetic(state, action) {
      const newCosmetic = action.payload;
      console.log("update cosmetic from redux");
      console.log(newCosmetic);
      state = newCosmetic;
      return state;
    },
  },
});

export const { updateCosmetic } = cosmeticSlice.actions;
export default cosmeticSlice.reducer;
