import Ingredient from "./IngredientsList";
import SelectedIngredient from "./SelectedIngredient";
import CosmeticDisplay from "./CosmeticDisplay";



const Cosmetic = () => {
  return (
    <div className="cosmetic">
      <CosmeticDisplay/>
      <Ingredient />
      <SelectedIngredient />
    </div>
  ) 

};

export default Cosmetic;
