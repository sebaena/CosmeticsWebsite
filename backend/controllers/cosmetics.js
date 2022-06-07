const jwt = require('jsonwebtoken')

const cosmeticsRouter = require("express").Router();
const Cosmetic = require("../models/cosmetic");
const User = require("../models/user");

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

cosmeticsRouter.get("/", async (request, response) => {
  const query = request.query;
  const cosmetics = await Cosmetic.find(query);
  response.json(cosmetics);
});

cosmeticsRouter.get("/:id", async (request, response) => {
  // const cosmetic = await Cosmetic.findOne({ "id": request.params.id });
  const cosmetic = await Cosmetic.findById(request.params.id);
  if (cosmetic) {
    response.json(cosmetic.toJSON());
  } else {
    response.status(404).end();
  }
});

cosmeticsRouter.post("/", async (request, response) => {
  const body = request.body;
  // when user logged in, frontend will receive a token from server
  // get the token from frontend request
  // if token exists then user is able to create new cosmetics


  // const token = getTokenFrom(request);
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if(!decodedToken.username){
  //   return response.status(400).json({error: "token is invalid"});
  // }
  // const user = await User.findOne({username: username});

  // if (body.name == undefined) {
  //   return response.status(400).json({ error: "Name missing" });
  // }

  const cosmetic = new Cosmetic(body);
  const savedCosmetic = await cosmetic.save((err, new_cosmetic) => {
    console.log(new_cosmetic.id);
  });

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
