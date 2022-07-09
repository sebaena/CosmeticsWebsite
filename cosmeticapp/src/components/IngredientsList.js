
import SelectedIngredient from "./SelectedIngredient";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {useState} from 'react';
// import {updateSelectedIngredient} from "../reducers/ingredientReducer";
import {updateSelectedIngredient} from "../reducers/cosmeticReducer";

const Ingredient = () => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector((state)=> state.cosmetic.currentCosmetic.ingredients);
  const [clicked, setClicked] = useState(false);

  const setSelectedIngredient = ( ingredient, index) =>{
    console.log("ingredientsList= ", ingredient)
    dispatch(updateSelectedIngredient(ingredient));

    if( clicked === index){
      return setClicked(null);
    }
    setClicked(index);
  };

  return currentIngredients? (
    <div className="ingredients-wrapper">
      <p>ingredients:</p>

        {currentIngredients.map( (ingredient, index) => (
          <div key={index}>
            <button className="button-ingredient" key={ingredient.name} 
               onClick={() => setSelectedIngredient(ingredient.name, index)} >
              {ingredient.name}
            </button>

            {clicked === index ? ( <SelectedIngredient key={index}/>) : null}
           
          </div>

          
         
         
         
         ))}
    </div>
  ) :  ( <> </> )
 
};

export default Ingredient;
