const Cosmetic = (props) => {
  const { cosmetic } = props;

  return (
    <div>
      <img src={cosmetic.picture} />
      <p>Cosmetic Name : {cosmetic.name}</p>
      <p>ingredients:</p>
      <ul>
        {cosmetic.ingredients.map((ingredient) => (
          // TODO: <li> click event should pass ingredient name to another component, this component can search and display what does this ingredient do
          <li
            key={ingredient.name}
            onClick={() => {
              console.log("search for functions of " + ingredient.name);
            }}
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cosmetic;
