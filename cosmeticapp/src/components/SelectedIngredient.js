
import { useSelector } from 'react-redux';

const SelectedIngredient = ()=> {
    const selected_ingredient = useSelector((state)=> state.ingredient.selectedIngredient[0]);

    return selected_ingredient ? (
        <div>
            <section className="sample-content">
                <h1>{selected_ingredient.function}</h1>
            </section>

        </div>
    ):(<></>)
}

export default SelectedIngredient;