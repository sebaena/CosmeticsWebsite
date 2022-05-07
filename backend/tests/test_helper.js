const Cosmetic = require("../models/cosmetic");
const Ingredient = require("../models/ingredient");

const initialCosmetics = [
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

const initialIngredients = [
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

const nonExistingCosmeticId = async () => {
  return initialCosmetics.length + 10000;
};

const cosmeticInDb = async () => {
  const cosmetics = await Cosmetic.find({});
  return cosmetics.map((cosmetic) => cosmetic.toJSON());
};

const nonExistingIngredientId = async () => {
  const ingredient = new Ingredient({
    name: "test",
  });
  await ingredient.save();
  await ingredient.remove();

  return ingredient.id.toString();
};

const ingredientInDb = async () => {
  const ingredients = await Ingredient.find({});
  return ingredients.map((ingredient) => ingredient.toJSON());
};

module.exports = {
  initialCosmetics,
  initialIngredients,
  nonExistingCosmeticId,
  nonExistingIngredientId,
  cosmeticInDb,
  ingredientInDb,
};
