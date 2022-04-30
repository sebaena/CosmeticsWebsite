const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Cosmetic = require("../models/cosmetic");
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

beforeEach(async ()=> {
    await Cosmetic.deleteMany({})
    let cosmeticObject = new Cosmetic(initialCosmetics[0]);
    await cosmeticObject.save();
    cosmeticObject = new Cosmetic(initialCosmetics[1]);
    await cosmeticObject.save();
    cosmeticObject = new Cosmetic(initialCosmetics[2]);
    await cosmeticObject.save();
})

test("cosmetics are returned as json", async () => {
  await api
    .get("/api/cosmetics")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test(`there are ${initialCosmetics.length} test cosmetics`, async () => {
  const response = await api.get("/api/cosmetics");

  expect(response.body).toHaveLength(initialCosmetics.length);
});

test(`the first cosmetic is ${initialCosmetics[0].name}`, async () => {
  const response = await api.get("/api/cosmetics");

  const names = response.body.map(r => r.name);
  expect(names).toContain(initialCosmetics[0].name);
});

afterAll(() => {
  mongoose.connection.close();
});
