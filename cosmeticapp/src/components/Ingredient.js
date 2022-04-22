const Ingredient = (props) => {
  const { ingredient } = props;
  return (
    <div>
      <p className="ingredientFunc">{ingredient.name}</p>
      <p className="ingredientFunc">{ingredient.function}</p>
    </div>
  );
};

export default Ingredient;
