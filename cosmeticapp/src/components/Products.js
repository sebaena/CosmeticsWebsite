
import { useState, useEffect } from "react";
import Cosmetic from "./Cosmetic";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {clearSelectedIngredient} from "../reducers/ingredientReducer"

import {
    initializeCosmetics,
    updateAllCosmeticIds,
    updateCurrentIndex,
    updateCurrentCosmetic,
    nextCosmetic,
    findCosmetic,
  } from "../reducers/cosmeticReducer";




const Products = () => {

    const [searchName, setSearchName] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(initializeCosmetics());
    }, [dispatch]);


    const all_cosmetics_cache = useSelector((state)=> state.cosmetic.allCosmeticIds);


    const nextItem = async () => {
        dispatch(nextCosmetic());
        dispatch(clearSelectedIngredient());
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
        <label>
        Search Cosmetic:
        <input
            type="text"
            value={searchName}
            onChange={(event) => handleSearchBoxChange(event)}
        ></input>
        </label>

        <button onClick={nextItem}>Next Item</button>
        <Cosmetic />
    </div>
    );


};

export default Products;
