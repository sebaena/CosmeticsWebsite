import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Cosmetic from "./Cosmetic";

import {
  initializeCosmetics,
  nextCosmetic,
  nextSeveralCosmetics,
  findCosmeticByName,
  findCosmeticByIngredient,
  setSearchedCosmeticName,
  setSearchedIngredientName,
} from "../reducers/cosmeticReducer";

const Products = () => {
  const dispatch = useDispatch();
  const cosmeticIndexCounter = useSelector(
    (state) => state.cosmetic.indexCounter
  );
  const currentCosmetics = useSelector(
    (state) => state.cosmetic.currentCosmetic
  );
  const searchedCosmeticName = useSelector(
    (state) => state.cosmetic.searchedCosmeticName
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

  // add 1 extra cosmetic to currentCosmetics in cosmetic reducer
  const nextItemHandle = async () => {
    dispatch(nextCosmetic());
  };

  // add several extra cosmetics to currentCosmetics in cosmetic reducer
  const nextSeveralItemHandle = async (n) => {
    dispatch(nextSeveralCosmetics(n));
  };

  // handle searchbox text changes
  const handleSearchCosmeticBoxChange = async (e) => {
    dispatch(setSearchedCosmeticName(e.target.value));
    e.preventDefault();
    dispatch(findCosmeticByName(e.target.value));
  };

  // handle searchbox text changes
  const handleSearchIngredientBoxChange = async (e) => {
    dispatch(setSearchedIngredientName(e.target.value));
    e.preventDefault();
    dispatch(findCosmeticByIngredient(e.target.value));
  };

  return (
    <div>
      {/* TODO: maybe these can be put in different components, bit messy here */}
      {/* search input for searching by cosmetic name */}
      <div className="search-bar">
        <label>
          <input
            type="text"
            placeholder=" Search Cosmetic "
            className="search-field"
            value={searchedCosmeticName ? searchedCosmeticName : ""}
            onChange={(event) => handleSearchCosmeticBoxChange(event)}
          ></input>
        </label>
        <i className="gg-search"></i>
      </div>
      {/* search input for searching by ingredient name*/}
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
      {/* display cosmetic components */}
      <div className="cosmetic-wrapper">


        {/* This is the product menu */}
      {/* <div className="product-menu"> */}
          {/* <i className="product-options">Yibo is a noob</i> */}
          {/* <i className="product-options">truth hurts</i> */}
{/*           
        <div className="product-options">

        </div> */}

        {/* </div> */}
        {currentCosmetics ? (
          currentCosmetics.map((cosmetic, index) => (
            <Cosmetic key={index} idx={index} cosmetic={cosmetic} />
          ))
        ) : (
          <></>
        )}
      </div>
      {/* button to display more cosmetics */}
      {/* <div className="button-wrapper">
        <button
          className="button"
          onClick={() => {
            nextSeveralItemHandle(3);
          }}
        >
          <span>More Items</span>
        </button>
      </div> */}
    </div>
  );
};

export default Products;
