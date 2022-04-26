const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
console.log("Connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// create Ingredient model for database
const ingredientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  function: String
});

ingredientSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);