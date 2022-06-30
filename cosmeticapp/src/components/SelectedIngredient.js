
import { useSelector } from 'react-redux';

const SelectedIngredient = ()=> {
    const selected_ingredient = useSelector((state)=> state.ingredient.selectedIngredient[0]);

    return selected_ingredient ? (
        <div> {selected_ingredient.function}</div>
    ):(<></>)
}

export default SelectedIngredient;