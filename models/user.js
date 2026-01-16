const mongoose = require("mongoose");

const Term = require('./term');

const termSchema = Term.schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: [
    termSchema
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;