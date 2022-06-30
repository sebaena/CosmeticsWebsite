
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';


const SelectedIngredient = ()=> {
    const dispatch = useDispatch();
    const selected_ingredient = useSelector((state)=> state.ingredient.selectedIngredient[0]);

    console.log("hola", selected_ingredient);

    if(selected_ingredient){
        return(
            <div> {selected_ingredient.function}</div>
        )
    }else{
        return(
            <div></div>
        )
    }


}

export default SelectedIngredient;