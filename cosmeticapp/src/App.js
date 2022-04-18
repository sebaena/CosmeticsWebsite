var cosmetics = require('./testdata/cosmetics.json');
var ingredients = require('./testdata/ingredients.json');

const Cosmetic = (props) => {
  return (
    <div>
      <img src={props.picture}/>
    </div>
  )
}

function App() {
  console.log(cosmetics);
  console.log(ingredients);

  return (
    <div>
      <p>hello cosmetics</p>
    </div>
  );
}

export default App;
