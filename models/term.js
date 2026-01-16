const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['front end', 'back end', 'dev ops'],
    required: true,
}
});

const Term = mongoose.model("Term", termSchema);

module.exports = Term;