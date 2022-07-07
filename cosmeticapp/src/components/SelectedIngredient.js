
import { useSelector } from 'react-redux';

const SelectedIngredient = ()=> {
    const selected_ingredient = useSelector((state)=> state.cosmetic.selectedIngredient);
    console.log("selected_ingredient", selected_ingredient);

    return selected_ingredient ? (
        <div>
            <section className="sample-content">
                <h1>{selected_ingredient[0].function}</h1>
            </section>

        </div>
    ):(<></>)
}

export default SelectedIngredient;