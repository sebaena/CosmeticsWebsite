import Ingredient from "./IngredientsList";
import CosmeticDisplay from "./CosmeticDisplay";



const Cosmetic = () => {
  return (
    <div className="cosmetic-wrapper">
      <div className="cosmetic">
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
      </div>
      <div className="cosmetic">
        <CosmeticDisplay />
        <Ingredient />
      </div>
    </div>
  ) 

};

export default Cosmetic;
