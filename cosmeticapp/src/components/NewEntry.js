import {useState} from "react";

const NewEntry = () =>{

  const [products, setProducts] = useState([ {name:'', ingredient:[]} ]);
  const [newCosmetic, setNewCosmetic] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleCosmeticChange = (event) => { 
    setNewCosmetic(event.target.value);
    console.log("new cosmetic", newCosmetic);
  }

  const handleIngredientChange = (index, event) => { 
    let temp_ing = [...ingredients]
    console.log("temp_ing", temp_ing);
    temp_ing[index] = event.target.value;
    setIngredients(temp_ing);
    console.log("ingredient", ingredients);
  }

//  const handleCosmeticChange = (event, index) => { 
//    let temp = [...cosmetic];
//    if(event.target.name === "ingredient"){
//     temp[index][event.target.name][0] = event.target.value; 
//    }else{
//      temp[index][event.target.name] = event.target.value; 
//    }
//    setCosmetic(temp);
//    console.log("new cosmetic", cosmetic);
//  }


  const addCosmetic = (event) => {
    let newProduct = {
      name: newCosmetic,
      ingredients: ingredients
    }
    event.preventDefault();
    setProducts(newProduct);
    console.log("ENVIOOO");
    //setIngredients([]);
    //setNewCosmetic('');
  }

  const addIngredient = () => {
    let ingredient = []
      setIngredients([...ingredients, ingredient]);
  }


  return(
    <div>
      <form onSubmit= {event => addCosmetic(event)}>

        <input 
          value= {newCosmetic} 
          name = "name"
          onChange={event => handleCosmeticChange(event)} 
          placeholder = 'Product Name' />

        {
          ingredients.map((data, index ) => {
            return(
              <div>
                <input 
                  value= {data} 
                  name = "ingredient"
                  onChange={event => handleIngredientChange(index,event)} 
                  placeholder = 'Ingredientssss' />
              </div>
            )
        })
        }

        
        <button onClick={addIngredient}> Add Ingredient</button>
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

