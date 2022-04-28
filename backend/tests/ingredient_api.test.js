const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Ingredient = require("../models/ingredient");
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

beforeEach(async () => {
  await Ingredient.deleteMany({});
  let ingredientObject = new Ingredient(initialIngredients[0]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[1]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[2]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[3]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[4]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[5]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(initialIngredients[6]);
  await ingredientObject.save();
});

test("ingredients are returned as json", async () => {
  await api
    .get("/api/ingredients")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test(`there are ${initialIngredients.length} test ingredients`, async () => {
  const response = await api.get("/api/ingredients");

  expect(response.body).toHaveLength(initialIngredients.length);
});

test(`the first ingredient is ${initialIngredients[0].name}`, async () => {
  const response = await api.get("/api/ingredients");

  const names = response.body.map((r) => r.name);
  expect(names).toContain(initialIngredients[0].name);
});

afterAll(() => {
  mongoose.connection.close();
});
