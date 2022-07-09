
import SelectedIngredient from "./SelectedIngredient";
import { useDispatch } from "react-redux";
import {useState} from 'react';
import {updateSelectedIngredient} from "../reducers/cosmeticReducer";

const Ingredient = ({ingredients}) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const setSelectedIngredient = ( ingredient, index) =>{
    console.log("ingredientsList= ", ingredient)
    dispatch(updateSelectedIngredient(ingredient));

    if( clicked === index){
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <div>
        <div>
            <p>ingredients:</p>
            {ingredients.map( (ingredient, index) => (
              <div key={index}>
                <button className="button-ingredient" key={ingredient.name} 
                  onClick={() => setSelectedIngredient(ingredient.name, index)} >
                  {ingredient.name}
                </button>
                {clicked === index ? ( <SelectedIngredient key={index}/>) : null}
              </div>
            ))}
        </div>
    </div>

      
     
  ) 
};

export default Ingredient;

// import SelectedIngredient from "./SelectedIngredient";
// import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux';
// import {useState} from 'react';
// import {updateSelectedIngredient} from "../reducers/cosmeticReducer";

// const Ingredient = () => {
//   const dispatch = useDispatch();
//   const currentCosmetic = useSelector((state)=> state.cosmetic.currentCosmetic);
//   const currentIngredients = useSelector((state)=> state.cosmetic.currentCosmetic.ingredients);
//   const [clicked, setClicked] = useState(false);

//   const setSelectedIngredient = ( ingredient, index) =>{
//     console.log("ingredientsList= ", ingredient)
//     dispatch(updateSelectedIngredient(ingredient));

//     if( clicked === index){
//       return setClicked(null);
//     }
//     setClicked(index);
//   };

//   return Object.keys(currentCosmetic).length > 0 ?  (


//     <div>
//       {currentCosmetic.map( cosmetic =>(
//         <div>
//           <img src={cosmetic.picture} />
//           <p className="cosmetic-title">{cosmetic.name}</p>
//           <div className="ingredients-wrapper">
//             <p>ingredients:</p>
//             {cosmetic.ingredients.map( (ingredient, index) => (
//               <div key={index}>
//                 <button className="button-ingredient" key={ingredient.name} 
//                   onClick={() => setSelectedIngredient(ingredient.name, index)} >
//                   {ingredient.name}
//                 </button>
//                 {clicked === index ? ( <SelectedIngredient key={index}/>) : null}
//               </div>
//             ))}
//         </div>

//         </div>

//       ))}
//       </div>
//   ) :  ( <> </> )
 
// };

// export default Ingredient;
