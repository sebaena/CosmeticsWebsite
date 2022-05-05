const cosmeticsRouter = require("express").Router();
const Cosmetic = require("../models/cosmetic");

cosmeticsRouter.get("/", async (request, response) => {
  const cosmetics = await Cosmetic.find({});
  response.json(cosmetics);
});

cosmeticsRouter.get("/:id", async (request, response) => {
  const cosmetic = await Cosmetic.findOne({ "id": request.params.id });
  if (cosmetic) {
    response.json(cosmetic.toJSON());
  } else {
    response.status(404).end();
  }
});

cosmeticsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.name == undefined) {
    return response.status(400).json({ error: "Name missing" });
  }

  const cosmetic = new Cosmetic(body);
  const savedCosmetic = await cosmetic.save();

  response.status(201).json(savedCosmetic);
});

cosmeticsRouter.delete("/:id", async (request, response) => {
  await Cosmetic.findOneAndRemove({ "id": request.params.id });
  response.status(204).end();
});

cosmeticsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const cosmetic = body;
  const updatedCosmetic = await Cosmetic.findOneAndUpdate(
    { "id": request.params.id },
    cosmetic,
    { new: true }
  );
  response.status(202).json(updatedCosmetic);
});

module.exports = cosmeticsRouter;
