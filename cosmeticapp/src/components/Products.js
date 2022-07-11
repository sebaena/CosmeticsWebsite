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
  //clearSelectedIngredient,
} from "../reducers/cosmeticReducer";
import cosmetic from "../services/cosmetic";

const Products = () => {
  const [searchName, setSearchName] = useState("");

  const dispatch = useDispatch();
  const cosmeticIndexCounter = useSelector(
    (state) => state.cosmetic.indexCounter
  );
  const currentCosmetics = useSelector(
    (state) => state.cosmetic.currentCosmetic
  );

  useEffect(() => {
    dispatch(initializeCosmetics());
  }, [dispatch]);

  const all_cosmetics_cache = useSelector(
    (state) => state.cosmetic.allCosmeticIds
  );

  const nextItemHandle = async () => {
    // dispatch(clearSelectedIngredient());
    dispatch(nextCosmetic());
  };

  const nextSeveralItemHandle = async (n) => {
    dispatch(nextSeveralCosmetics(n));
  };

  // handle searchbox text changes
  const handleSearchBoxChange = async (e) => {
    setSearchName(e.target.value);
    e.preventDefault();

    var matched = all_cosmetics_cache.find((stored_objs) =>
      stored_objs.name.includes(e.target.value.toLowerCase())
    );

    if (matched) {
      dispatch(findCosmetic(matched.id));
    } else {
      console.log("item not found");
    }
  };

  return (
    <div>
      <div className="search-bar">
        <label>
          <input
            type="text"
            placeholder=" Search "
            className="search-field"
            value={searchName}
            onChange={(event) => handleSearchBoxChange(event)}
          ></input>
        </label>
        <i className="gg-search"></i>
      </div>

      <div className="cosmetic-wrapper">
        {currentCosmetics.map((cosmetic, index) => (
          <Cosmetic key={index} idx={index} cosmetic={cosmetic} />
        ))}
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
