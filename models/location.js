const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    unique: true,
  },
  lng: {
    type: Number,
    unique: true,
  },
});

const Category = mongoose.model("Location", LocationSchema);
module.exports = Category;
