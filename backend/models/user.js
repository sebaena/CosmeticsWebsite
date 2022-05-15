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

// create User model for database
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
