const Ingredient = (props) => {
  const { ingredient } = props;
  return (
    <div>
      <p>{ingredient.name}</p>
      <p>{ingredient.function}</p>
    </div>
  );
};

export default Ingredient;
