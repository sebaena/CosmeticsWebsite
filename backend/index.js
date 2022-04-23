const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let cosmetics = [
  {
    _id: "625da774913c95013ab4b432",
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
    _id: "af25da774913c95013ab4b43",
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
    _id: "af25da774913c9xxxxxb4b43",
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`mafakas is running server on PORT ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("<h1>There ain't got nothing, get out of here!</h1>");
});

app.get("/api/cosmetics", (request, response) => {
  response.json(cosmetics);
});

// get one cosmetic by requested id
app.get("/api/cosmetics/:id", (request, response) => {
  const id = Number(request.params.id);
  const cosmetic = cosmetics.find((cosmetic) => cosmetic.id === id);
  if (cosmetic) {
    response.json(cosmetic);
  } else {
    response.status(404).end();
  }
});

// get all cosmetics
app.get("/api/cosmetics", (request, response) => {
  response.json(cosmetics);
});

// delete one cosmetic by requested id
app.delete("/api/cosmetics/:id", (request, response) => {
  const id = Number(request.params.id);
  cosmetics = cosmetics.filter((cosmetic) => cosmetic.id !== id);

  response.status(204).end();
});

// add one cosmetic
const generateId = () => {
  // create id array
  const ids = cosmetics.map((n) => n.id);
  // get the max id
  const maxId = cosmetics.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
};
app.post("/api/cosmetics", (request, response) => {
  const body = request.body;
  // if cosmetic name is missing, return error
  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  // create cosmetic object and add into the array
  const cosmetic = body;
  cosmetic.id = generateId();
  cosmetics = cosmetics.concat(cosmetic);
  // return response
  response.json(cosmetics);
});
