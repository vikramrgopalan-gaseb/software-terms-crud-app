const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const authController = require("./controllers/auth.js");

const session = require('express-session');

const MongoStore = require("connect-mongo");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(methodOverride("_method"));
app.use(morgan('dev'));
// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

// AUTHENTICATION

// server.js

// GET /
app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use("/auth", authController);

// Import the user model

const User = require("./models/user.js");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Import the application model

const Application = require("./models/application.js");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// New term (CREATE)

app.get("/new-term", (req, res) => {
  res.render("views/new.ejs");
});

app.post("/all-terms", async (req, res) => {
  const newTerm = await Term.create(req.body);
   res.redirect("/all-terms");
});

// All terms (READ)

app.get("/all-terms", async (req, res) => {
  const allTerms = await Term.find();
  res.render("views/all-terms.ejs", { terms: allTerms });
});