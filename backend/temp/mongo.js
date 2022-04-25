const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cosmeticApp:${password}@cluster0.ptrgb.mongodb.net/cosmeticApp?retryWrites=true&w=majority`;

mongoose.connect(url);

// create Cosmetic model for database
const cosmeticSchema = new mongoose.Schema({
  id: Number,
  name: String,
  picture: String,
  ingredients: Object,
});
const Cosmetic = mongoose.model("Cosmetic", cosmeticSchema);
// create Ingredient model for database
const ingredientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  function: String,
});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

let cosmetics = [
  {
    id: 0,
    name: "Lumene Nordic Hydra Cream",
    picture: "pictures/lumene_nordic_hydra_cream.jpeg",
    ingredients: [
      {
        name: "Aqua",
      },
      {
        name: "Caprylic",
      },
      {
        name: "Shea Butter",
      },
      {
        name: "Hydrogenated Polydecene",
      },
      {
        name: "Propanediol",
      },
    ],
  },
  {
    id: 1,
    name: "Lumene CC cream",
    picture: "pictures/lumene_cc_cream.jpeg",
    ingredients: [
      {
        name: "Aqua",
      },
      {
        name: "Diisopropyl",
      },
      {
        name: "Glycerin",
      },
    ],
  },
  {
    id: 2,
    name: "Lumene superpower perfume",
    picture: "pictures/lumene_superpower_perfume.jpeg",
    ingredients: [
      {
        name: "Aqua",
      },
      {
        name: "Shea Butter",
      },
      {
        name: "Propanediol",
      },
    ],
  },
];

let ingredients = [
  {
    id: 0,
    name: "Aqua",
    function: "Moisturize skin",
  },
  {
    id: 1,
    name: "Caprylic",
    function: "Moisturize deep skin",
  },
  {
    id: 2,
    name: "Shea Butter",
    function: "I don't know why do you put butter on the face",
  },
  {
    id: 3,
    name: "Hydrogenated Polydecene",
    function: "Make your skin as smooth as baby butt",
  },
  {
    id: 4,
    name: "Propanediol",
    function: "smells good",
  },
  {
    id: 5,
    name: "Diisopropyl",
    function: "this is an English word??",
  },
  {
    id: 6,
    name: "Glycerin",
    function: "clean the dirty skin",
  },
];

/*note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});*/
cos = [];
cosmetics.forEach((cosmetic, idx) => {
  cos[idx] = new Cosmetic(cosmetic);
});

ing = [];
ingredients.forEach((ingredient, idx) => {
  ing[idx] = new Ingredient(ingredient);
});

cos.forEach((c) => {
  console.log(c);
});
ing.forEach((i) => {
  console.log(i);
});

//Cosmetic.insertMany(cos).then((res) => mongoose.connection.close());
//Ingredient.insertMany(ing).then((res) => mongoose.connection.close());
