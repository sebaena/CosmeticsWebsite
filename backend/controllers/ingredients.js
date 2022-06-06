const ingredientsRouter = require("express").Router();
const Ingredient = require("../models/ingredient");

ingredientsRouter.get("/", async (request, response) => {
  const ingredients = await Ingredient.find({});
  response.json(ingredients);
});

ingredientsRouter.get("/:id", async (request, response) => {
  // const ingredient = await Ingredient.findOne({ "id": request.params.id });
  const ingredient = await Ingredient.findById(request.params.id);
  if (ingredient) {
    response.json(ingredient.toJSON());
  } else {
    response.status(404).end();
  }
});

ingredientsRouter.get("/:name", async (request, response) => {
  const ingredient = await Ingredient.find({"name": request.params.name });
  // const ingredient = await Ingredient.findById(request.params.id);
  if (ingredient) {
    response.json(ingredient.toJSON());
  } else {
    response.status(404).end();
  }
});

ingredientsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.name == undefined) {
    return response.status(400).json({ error: "Name missing" });
  }

  const ingredient = new Ingredient(body);
  const savedIngredient = await ingredient.save();

  response.status(201).json(savedIngredient);
});

ingredientsRouter.delete("/:id", async (request, response) => {
  await Ingredient.findOneAndRemove({ "id": request.params.id });
  response.status(204).end();
});

ingredientsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const ingredient = body;
  const updatedIngredient = await Ingredient.findOneAndUpdate(
    { "id": request.params.id },
    ingredient,
    { new: true }
  );
  response.status(202).json(updatedIngredient);
});

module.exports = ingredientsRouter;
