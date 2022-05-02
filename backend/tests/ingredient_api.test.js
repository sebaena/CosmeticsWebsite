const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Ingredient = require("../models/ingredient");

beforeEach(async () => {
  await Ingredient.deleteMany({});
  let ingredientObject = new Ingredient(helper.initialIngredients[0]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[1]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[2]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[3]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[4]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[5]);
  await ingredientObject.save();
  ingredientObject = new Ingredient(helper.initialIngredients[6]);
  await ingredientObject.save();
});

test("Ingredients are returned as json", async () => {
  await api
    .get("/api/ingredients")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 500000);

test('All ingredients are returned', async () => {
  const response = await api.get('/api/ingredients')

  expect(response.body).toHaveLength(helper.initialIngredients.length)
})

test('A specific ingredient is within the returned ingredients', async () => {
  const response = await api.get('/api/ingredients')

  const names = response.body.map(ingredient => ingredient.name)

  expect(names).toContain(helper.initialIngredients[0].name)
})

test("A valid ingredient can be added into db", async () => {
  const newIngredient = helper.initialIngredients[0];

  await api.post('/api/ingredients')
  .send(newIngredient)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const ingredientInDb = await helper.ingredientInDb();

  expect(ingredientInDb).toHaveLength(helper.initialIngredients.length + 1);
  expect(ingredientInDb.filter(ingredient => ingredient.name === helper.initialIngredients[0].name)).toHaveLength(2);
})

test("Ingredient without name can't be added into db", async () => {
  const newIngredient = helper.initialIngredients[0];
  delete newIngredient.name;

  await api
  .post('/api/ingredients')
  .send(newIngredient)
  .expect(400)

  const ingredientInDb = await helper.ingredientInDb();

  expect(ingredientInDb).toHaveLength(helper.initialIngredients.length);
})

afterAll(() => {
  mongoose.connection.close();
});
