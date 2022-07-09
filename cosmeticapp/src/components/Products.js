
import { useState, useEffect } from "react";
import Cosmetic from "./Cosmetic";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import {clearSelectedIngredient} from "../reducers/ingredientReducer"

import {
    initializeCosmetics,
    updateAllCosmeticIds,
    updateCurrentIndex,
    updateCurrentCosmetic,
    nextCosmetic,
    findCosmetic,
    clearSelectedIngredient,
  } from "../reducers/cosmeticReducer";




const Products = () => {

    const [searchName, setSearchName] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(initializeCosmetics());
    }, [dispatch]);


    const all_cosmetics_cache = useSelector((state)=> state.cosmetic.allCosmeticIds);


    const nextItem = async () => {
      dispatch(clearSelectedIngredient());
        dispatch(nextCosmetic());
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
    <div >
        <div className="search-bar">
            <label >
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

        <Cosmetic />
        <div className="button-wrapper">
            <button className="button" onClick={nextItem}>
                <span>
                    Next Item
                </span>
            </button>
        </div>
    </div>
    );


};

export default Products;
