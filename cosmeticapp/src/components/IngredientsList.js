
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

const Ingredient = (props) => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector((state)=> state.cosmetic.currentCosmetic.ingredients);

  const searchIngredientFuc = (selected_ingredient) => {
    console.log("shega hasta aca");
  };


  if(currentIngredients){
    return (
      <div>
        <ul>
          {currentIngredients.map( (ingredient) => (
            <li key={ingredient.name} onClick={() => searchIngredientFuc(ingredient.name)} >
              {ingredient.name}
            </li>
          ))}

        </ul>
      </div>
    )

  }else{
    return (
      <div> ...Loading... </div>
    )
  }


    
  
  
  // return Object.keys(currentIngredients).length !== 0? (
  //   <div>
  //     {/* <p className="ingredientFunc">hola</p> */}
  //     <p className="ingredientFunc">{currentIngredients.ingredients[0].name}</p>
  //     {/* <p className="ingredientFunc">{ingredient.function}</p> */}
  //   </div>
  // ) : (<div>Nothing to show</div>);
  
  // const { ingredient } = props;
  // return ingredient ? (
  //   <div>
  //     <p className="ingredientFunc">{currentCosmetic.ingredients[0]}</p>
  //     {/* <p className="ingredientFunc">{ingredient.function}</p> */}
  //   </div>
  // ) : (<div>Nothing to show</div>);




};

export default Ingredient;
