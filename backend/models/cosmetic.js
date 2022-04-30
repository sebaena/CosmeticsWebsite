const mongoose = require("mongoose");
const logger = require('../utils/logger')

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

// create Cosmetic model for database
const cosmeticSchema = new mongoose.Schema({
  id: Number,
  name: String,
  picture: String,
  ingredients: Object,
});

cosmeticSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Cosmetic', cosmeticSchema);