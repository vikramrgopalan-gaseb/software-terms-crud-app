const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
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

const Application = mongoose.model("Application", applicationSchema);

module.exports = applicationSchema;