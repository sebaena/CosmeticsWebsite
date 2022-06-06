const mongoose = require("mongoose");
const logger = require("../utils/logger");

const url = process.env.MONGODB_URL;
logger.info("Connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

// create Ingredient model for database
const ingredientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  function: String
});

ingredientSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);