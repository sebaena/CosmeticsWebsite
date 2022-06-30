
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {updateSelectedIngredient} from "../reducers/ingredientReducer";

const Ingredient = () => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector((state)=> state.cosmetic.currentCosmetic.ingredients);

  return currentIngredients? (
    <div>
      <p>ingredients:</p>
      <ul>
        {currentIngredients.map( (ingredient) => (
          <li key={ingredient.name} onClick={() => dispatch(updateSelectedIngredient(ingredient.name))} >
            {ingredient.name}
          </li>
        ))}

      </ul>
    </div>
  ) :  ( <> </> )
 
};

export default Ingredient;
