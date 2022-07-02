import Ingredient from "./IngredientsList";
import SelectedIngredient from "./SelectedIngredient";
import CosmeticDisplay from "./CosmeticDisplay";



const Cosmetic = () => {
  return (
    <div>
      <CosmeticDisplay/>
      <Ingredient />
      <SelectedIngredient />
    </div>
  ) 

};

export default Cosmetic;
