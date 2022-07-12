import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cosmetic from "./Cosmetic";

// import {clearSelectedIngredient} from "../reducers/ingredientReducer"

import {
  initializeCosmetics,
  //updateAllCosmeticIds,
  //updateCurrentIndex,
  //updateCurrentCosmetic,
  nextCosmetic,
  nextSeveralCosmetics,
  findCosmetic,
  findCosmeticByName,
  findCosmeticByIngredient,
  setSearchedIngredientName,
  //clearSelectedIngredient,
} from "../reducers/cosmeticReducer";
import cosmetic from "../services/cosmetic";

const Products = () => {
  const [searchCosmeticName, setSearchCosmeticName] = useState("");
  // const [searchIngredientName, setSearchIngredientName] = useState("");

  const dispatch = useDispatch();
  const cosmeticIndexCounter = useSelector(
    (state) => state.cosmetic.indexCounter
  );
  const currentCosmetics = useSelector(
    (state) => state.cosmetic.currentCosmetic
  );
  const searchedIngredientName = useSelector(
    (state) => state.cosmetic.searchedIngredientName
  );
  useEffect(() => {
    dispatch(initializeCosmetics());
  }, [dispatch]);

  const all_cosmetics_ids_names_cache = useSelector(
    (state) => state.cosmetic.allCosmeticIdsAndNames
  );

  const nextItemHandle = async () => {
    // dispatch(clearSelectedIngredient());
    dispatch(nextCosmetic());
  };

  const nextSeveralItemHandle = async (n) => {
    dispatch(nextSeveralCosmetics(n));
  };

  // handle searchbox text changes
  const handleSearchCosmeticBoxChange = async (e) => {
    setSearchCosmeticName(e.target.value);
    e.preventDefault();

    dispatch(findCosmeticByName(e.target.value));
    /*var matched = all_cosmetics_ids_names_cache.find((stored_objs) =>
      stored_objs.name.includes(e.target.value.toLowerCase())
    );

    if (matched) {
      dispatch(findCosmetic(matched.id));
    } else {
      console.log("item not found");
    }*/
  };

  const handleSearchIngredientBoxChange = async (e) => {
    dispatch(setSearchedIngredientName(e.target.value));
    e.preventDefault();
    dispatch(findCosmeticByIngredient(e.target.value));
  };

  return (
    <div>
      <div className="search-bar">
        <label>
          <input
            type="text"
            placeholder=" Search Cosmetic "
            className="search-field"
            value={searchCosmeticName}
            onChange={(event) => handleSearchCosmeticBoxChange(event)}
          ></input>
        </label>
        <i className="gg-search"></i>
      </div>
      <div className="search-bar">
        <label>
          <input
            type="text"
            placeholder=" Search Ingredient "
            className="search-field"
            value={searchedIngredientName ? searchedIngredientName : ""}
            onChange={(event) => handleSearchIngredientBoxChange(event)}
          ></input>
        </label>
        <i className="gg-search"></i>
      </div>
      <div className="cosmetic-wrapper">
        {currentCosmetics ? (
          currentCosmetics.map((cosmetic, index) => (
            <Cosmetic key={index} idx={index} cosmetic={cosmetic} />
          ))
        ) : (
          <></>
        )}
      </div>

      <div className="button-wrapper">
        <button
          className="button"
          onClick={() => {
            nextSeveralItemHandle(4);
          }}
        >
          <span>More Items</span>
        </button>
      </div>
    </div>
  );
};

export default Products;
