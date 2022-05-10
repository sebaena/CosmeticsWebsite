const Ingredient = (props) => {
  const { ingredient } = props;
  return ingredient ? (
    <div>
      <p className="ingredientFunc">{ingredient.name}</p>
      <p className="ingredientFunc">{ingredient.function}</p>
    </div>
  ) : (<div>Nothing to show</div>);
};

export default Ingredient;
