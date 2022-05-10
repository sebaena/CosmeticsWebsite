const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Cosmetic = require("../models/cosmetic");
const Ingredient = require("../models/ingredient");

beforeEach(async () => {
  await Cosmetic.deleteMany({});
  await Cosmetic.insertMany(helper.initialCosmetics);
  await Ingredient.deleteMany({});
  await Ingredient.insertMany(helper.initialIngredients);
});

describe("Insert all tests", () => {
  test("Cosmetics are returned as json", async () => {
    await api
      .get("/api/cosmetics")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 500000);
  test("Ingredients are returned as json", async () => {
    await api
      .get("/api/ingredients")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 500000);
  test("All cosmetics are returned", async () => {
    const response = await api.get("/api/cosmetics");

    expect(response.body).toHaveLength(helper.initialCosmetics.length);
  });
  test("All ingredients are returned", async () => {
    const response = await api.get("/api/ingredients");

    expect(response.body).toHaveLength(helper.initialIngredients.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
