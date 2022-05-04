const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Cosmetic = require("../models/cosmetic");

beforeEach(async ()=> {
    await Cosmetic.deleteMany({})
    let cosmeticObject = new Cosmetic(helper.initialCosmetics[0]);
    await cosmeticObject.save();
    cosmeticObject = new Cosmetic(helper.initialCosmetics[1]);
    await cosmeticObject.save();
    cosmeticObject = new Cosmetic(helper.initialCosmetics[2]);
    await cosmeticObject.save();
})

test("Cosmetics are returned as json", async () => {
  await api
    .get("/api/cosmetics")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 500000);

test('All cosmetics are returned', async () => {
  const response = await api.get('/api/cosmetics')

  expect(response.body).toHaveLength(helper.initialCosmetics.length)
})

test('A specific cosmetic is within the returned cosmetics', async () => {
  const response = await api.get('/api/cosmetics')

  const names = response.body.map(cosmetic => cosmetic.name)

  expect(names).toContain(helper.initialCosmetics[0].name)
})

test("A valid cosmetic can be added into db", async () => {
  const newCosmetic = helper.initialCosmetics[0];

  await api.post('/api/cosmetics')
  .send(newCosmetic)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const cosmeticInDb = await helper.cosmeticInDb();

  expect(cosmeticInDb).toHaveLength(helper.initialCosmetics.length + 1);
  expect(cosmeticInDb.filter(cosmetic => cosmetic.name === helper.initialCosmetics[0].name)).toHaveLength(2);
})

test("Cosmetic without name can't be added into db", async () => {
  const newCosmetic = helper.initialCosmetics[0];
  delete newCosmetic.name;

  await api
  .post('/api/cosmetics')
  .send(newCosmetic)
  .expect(400)

  const cosmeticInDb = await helper.cosmeticInDb();

  expect(cosmeticInDb).toHaveLength(helper.initialCosmetics.length);
})

test("a specific cosmetic can be feteched", async () => {
  const firstCosmetic = helper.initialCosmetics[0];

  const fetechedCosmetic = await api
  .get(`/api/cosmetics/1`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  expect(fetechedCosmetic.body).toEqual(firstCosmetic);
})


afterAll(() => {
  mongoose.connection.close();
});
