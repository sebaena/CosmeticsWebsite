import {useState} from "react";
import cosmeticService from "../services/cosmetic";

const NewEntry = () =>{

  const [newCosmetic, setNewCosmetic] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [image, setImage] = useState({file: null});


  const handleCosmeticChange = (event) => { 
    event.preventDefault();
    setNewCosmetic(event.target.value);
  }

  const handleIngredientChange = (index, event) => { 
    event.preventDefault();
    let temp_ing = [...ingredients]
    console.log("temp_ing", temp_ing);
    temp_ing[index] = event.target.value;

    setIngredients(temp_ing);
    console.log("ingredient", ingredients);
  }


  const addMoreIngredient = (event) => {

    const all_ingredients = ingredients.map(item =>{
      return {name: item}
    })

    const  newProduct = {
      name: newCosmetic,
      ingredients: all_ingredients
    }

    cosmeticService.create(newProduct);

  //  setIngredients(['']);
  //  setNewCosmetic('');
    event.preventDefault();

 }

  const addIngredient = (event) => {
    event.preventDefault();
    const ingredient = []
      setIngredients([...ingredients, ingredient]);
  }

  const addImage = (event) =>{
    setImage({ file: event.target.files[0] });
    console.log("image", image);
  }


     // <form onSubmit= {event => addCosmetic(event)}>
  return(
    <div>
      <form>
        <input 
          value= {newCosmetic} 
          name = "name"
          onChange={event => handleCosmeticChange(event)} 
          placeholder = 'Product Name' />
        <input type="file" onChange = {event =>addImage(event)} />
        
      </form>
      <form onSubmit= {event => addMoreIngredient(event)}>
        {
          ingredients.map((data, index ) => {
            return(
              <div>
                <input 
                  value= {data} 
                  name = "ingredient"
                  onChange={event => handleIngredientChange(index,event)} 
                  placeholder = 'Ingredients' />
              </div>
            )
        })
        }
        <button onClick={event => addIngredient(event)}> Add Ingredient</button>
        <button type="submit"> Save Entry</button>
      </form>
    </div>
  )
}

export default NewEntry;


//{
//          cosmetic.map((value, index)=>{
//            return (
//              <div>
//                <input 
//                  value= {cosmetic.name} 
//                  name = "name"
//                  onChange={event => handleCosmeticChange(event, index)} 
//                  placeholder = 'Product Name' />
//
//
//                { cosmetic.name == "ingredient" &&
//                    value.map(index_ingredient => 
//                      {
//                        return (
//                          <div>
//                            <input 
//                              value= {cosmetic.ingredient} 
//                              name = "ingredient"
//                              onChange={event => handleCosmeticChange(event, index)} 
//                              placeholder = 'Ingredient' />
//                          </div>
//                        )
//                      }
//
//                    )
//                    
//
//
//                }
//              </div>
//
//            )
//
//          }  )
//
//        }

