import { createSlice } from "@reduxjs/toolkit";
import cosmeticService from "../services/cosmetic";



// const initialState = {
//   _id: "625da774913c95013ab4b432",
//   name: "Lumene Nordic Hydra Cream",
//   picture: "pictures/lumene_nordic_hydra_cream.jpeg",
//   ingredients: [
//     {
//       name: "Aqua",
//     },
//     {
//       name: "Caprylic",
//     },
//     {
//       name: "Shea Butter",
//     },
//     {
//       name: "Hydrogenated Polydecene",
//     },
//     {
//       name: "Propanediol",
//     },
//   ],
// };

const cosmeticSlice = createSlice({
  name: "cosmetics",
  // initialState: [],
  initialState: {
    currentCosmetic: {},
    allCosmeticIds: []
  },
  reducers: {
    // updateCosmetic(state, action) {
    //   const newCosmetic = action.payload;
    //   console.log("update cosmetic from redux");
    //   console.log(newCosmetic);
    //   state = newCosmetic;
    //   return state;
    // },

    setCosmeticsIds(state, action) { 
      return action.payload
    }
  },
});


export const initializeCosmetics = () =>{
  return async dispatch =>{
    const cosmetics = await cosmeticService.getAll()

    var cosmetics_cache = [];

    cosmetics.map((all_cosmetics) => {
      cosmetics_cache = [...cosmetics_cache, { id: all_cosmetics.id, name: all_cosmetics.name.toLowerCase() }];
      return cosmetics_cache;
    });

    const first_cosmetic = await cosmeticService.getOne(cosmetics_cache[0].id);

    const cos = { currentCosmetic:first_cosmetic,
                  allCosmeticIds: cosmetics_cache
                }
    
    dispatch(setCosmeticsIds(cos))
  }
}

export const { updateCosmetic, setCosmeticsIds } = cosmeticSlice.actions;
export default cosmeticSlice.reducer;
