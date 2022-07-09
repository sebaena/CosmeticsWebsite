import Ingredient from "./IngredientsList";
import CosmeticDisplay from "./CosmeticDisplay";



import SelectedIngredient from "./SelectedIngredient";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';




const Cosmetic = () => {
  const dispatch = useDispatch();
  const currentCosmetic = useSelector((state)=> state.cosmetic.currentCosmetic);
  return Object.keys(currentCosmetic).length > 0 ?(
    <div className="cosmetic-wrapper">
        { currentCosmetic.map ((cosmetic, index) =>(
          <div className="cosmetic" key={index}>
            <CosmeticDisplay current_cosmetic={cosmetic} />
            <Ingredient ingredients={cosmetic.ingredients} />
          </div>

        ))}
      {/* <div className="cosmetic">
        <CosmeticDisplay />
        <Ingredient />
      </div>
      <div className="cosmetic">
        <CosmeticDisplay />
        <Ingredient />
      </div>
      <div className="cosmetic">
        <CosmeticDisplay />
        <Ingredient />
      </div> */}
    </div>
  ) :( <></>)

};

export default Cosmetic;
