const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Ingredient = require("../models/ingredient");

beforeEach(async () => {
  await Ingredient.deleteMany({});
  await Ingredient.insertMany(helper.initialIngredients);
  /*const ingredientObjects = helper.initialIngredients.map(ingredient => new Ingredient(ingredient));
  const promiseArray = ingredientObjects.map(ingredientObject => ingredientObject.save());
  await Promise.all(promiseArray);*/
});

describe("Read all ingredients", () => {
  test("Ingredients are returned as json", async () => {
    await api
      .get("/api/ingredients")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 500000);

  test("All ingredients are returned", async () => {
    const response = await api.get("/api/ingredients");

    expect(response.body).toHaveLength(helper.initialIngredients.length);
  });

  test("A specific ingredient is within the returned ingredients", async () => {
    const response = await api.get("/api/ingredients");

    const names = response.body.map((ingredient) => ingredient.name);

    expect(names).toContain(helper.initialIngredients[0].name);
  });
});

describe("Read one ingredient", () => {
  test("Succeeds with a valid id", async () => {
    const firstIngredient = helper.initialIngredients[0];

    const fetechedIngredient = await api
      .get(`/api/ingredients/${firstIngredient.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(fetechedIngredient.body).toEqual(firstIngredient);
  });

  test("fails with statuscode 404 if ingredient does not exist", async () => {
    const validNonexistingId = await helper.nonExistingIngredientId();
    await api.get(`/api/ingredients/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/ingredients/${invalidId}`).expect(400);
  });
});

describe("Update one ingredient", () => {
  test("Succeeds with a valid id", async () => {
    const firstIngredient = helper.initialIngredients[0];
    firstIngredient.name = "test";
    
    const updatedIngredient = await api
      .put(`/api/ingredients/${firstIngredient.id}`)
      .send(firstIngredient)
      .expect(202)
      .expect("Content-Type", /application\/json/);

    expect(updatedIngredient.body.name).toEqual("test");
  })
});

describe("Insert one new ingredient", () => {
  test("Succeeds with valid data", async () => {
    const newIngredient = helper.initialIngredients[0];

    await api
      .post("/api/ingredients")
      .send(newIngredient)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const ingredientInDb = await helper.ingredientInDb();

    expect(ingredientInDb).toHaveLength(helper.initialIngredients.length + 1);
    expect(
      ingredientInDb.filter(
        (ingredient) => ingredient.name === helper.initialIngredients[0].name
      )
    ).toHaveLength(2);
  });

  test("fails with status code 400 if data invaild", async () => {
    const newIngredient = helper.initialIngredients[0];
    delete newIngredient.name;

    await api.post("/api/ingredients").send(newIngredient).expect(400);

    const ingredientInDb = await helper.ingredientInDb();

    expect(ingredientInDb).toHaveLength(helper.initialIngredients.length);
  });
});

describe("Remove one ingredient from DB", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const ingredientToBeDeleted = helper.initialIngredients[0];
    await api.delete(`/api/ingredients/${ingredientToBeDeleted.id}`).expect(204);

    const ingredientsAfterDelete = await helper.ingredientInDb();
    expect(ingredientsAfterDelete).toHaveLength(
      helper.initialIngredients.length - 1
    );
    ids = ingredientsAfterDelete.map((ingredient) => ingredient.id);
    expect(ids).not.toContain(ingredientToBeDeleted.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
