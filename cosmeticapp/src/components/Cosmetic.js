import Ingredient from "./IngredientsList";
import SelectedIngredient from "./SelectedIngredient";
import CosmeticDisplay from "./CosmeticDisplay";



const Cosmetic = () => {
  return (
    <div className="cosmetic-wrapper">
      <div className="cosmetic">
        <CosmeticDisplay/>
        <Ingredient />
        <SelectedIngredient />
      </div>
    </div>
  ) 

};

export default Cosmetic;
