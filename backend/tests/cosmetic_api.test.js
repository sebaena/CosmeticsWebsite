const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Cosmetic = require("../models/cosmetic");

beforeEach(async () => {
  await Cosmetic.deleteMany({});
  await Cosmetic.insertMany(helper.initialCosmetics);
  /*const cosmeticObjects = helper.initialCosmetics.map(cosmetic => new Cosmetic(cosmetic));
  const promiseArray = cosmeticObjects.map(cosmeticObject => cosmeticObject.save());
  await Promise.all(promiseArray);*/
});

describe("Read all cosmetics", () => {
  test("Cosmetics are returned as json", async () => {
    await api
      .get("/api/cosmetics")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 500000);

  test("All cosmetics are returned", async () => {
    const response = await api.get("/api/cosmetics");

    expect(response.body).toHaveLength(helper.initialCosmetics.length);
  });

  test("A specific cosmetic is within the returned cosmetics", async () => {
    const response = await api.get("/api/cosmetics");

    const names = response.body.map((cosmetic) => cosmetic.name);

    expect(names).toContain(helper.initialCosmetics[0].name);
  });
});

describe("Read one cosmetic", () => {
  test("Succeeds with a valid id", async () => {
    const firstCosmetic = helper.initialCosmetics[0];

    const fetechedCosmetic = await api
      .get(`/api/cosmetics/${firstCosmetic.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(fetechedCosmetic.body).toEqual(firstCosmetic);
  });

  test("fails with statuscode 404 if cosmetic does not exist", async () => {
    const validNonexistingId = await helper.nonExistingCosmeticId();
    await api.get(`/api/cosmetics/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/cosmetics/${invalidId}`).expect(400);
  });
});

describe("Update one cosmetic", () => {
  test("Succeeds with a valid id", async () => {
    const firstCosmetic = helper.initialCosmetics[0];
    firstCosmetic.name = "test";
    
    const updatedCosmetic = await api
      .put(`/api/cosmetics/${firstCosmetic.id}`)
      .send(firstCosmetic)
      .expect(202)
      .expect("Content-Type", /application\/json/);

    expect(updatedCosmetic.body.name).toEqual("test");
  })
});

describe("Insert one new cosmetic", () => {
  test("Succeeds with valid data", async () => {
    const newCosmetic = helper.initialCosmetics[0];

    await api
      .post("/api/cosmetics")
      .send(newCosmetic)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const cosmeticInDb = await helper.cosmeticInDb();

    expect(cosmeticInDb).toHaveLength(helper.initialCosmetics.length + 1);
    expect(
      cosmeticInDb.filter(
        (cosmetic) => cosmetic.name === helper.initialCosmetics[0].name
      )
    ).toHaveLength(2);
  });

  test("fails with status code 400 if data invaild", async () => {
    const newCosmetic = helper.initialCosmetics[0];
    delete newCosmetic.name;

    await api.post("/api/cosmetics").send(newCosmetic).expect(400);

    const cosmeticInDb = await helper.cosmeticInDb();

    expect(cosmeticInDb).toHaveLength(helper.initialCosmetics.length);
  });
});

describe("Remove one cosmetic from DB", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const cosmeticToBeDeleted = helper.initialCosmetics[0];
    await api.delete(`/api/cosmetics/${cosmeticToBeDeleted.id}`).expect(204);

    const cosmeticsAfterDelete = await helper.cosmeticInDb();
    expect(cosmeticsAfterDelete).toHaveLength(
      helper.initialCosmetics.length - 1
    );
    ids = cosmeticsAfterDelete.map((cosmetic) => cosmetic.id);
    expect(ids).not.toContain(cosmeticToBeDeleted.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
