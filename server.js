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

// Session Save

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

// GET TO INDEX

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

// GET TO HOME

app.get("/home", (req, res) => {
   res.render("home.ejs", {
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

const Term = require("./models/term.js");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// New term (CREATE) // CONSIDER CREATING A CONTROLLER FOR NEW TERM CREATION

app.get("/new-term", (req, res) => {
  res.render("terms/new.ejs");
});

app.post("/terms", async (req, res) => {
  const newTerm = await Term.create(req.body);
   res.redirect("terms/index.ejs");
});

// All terms (READ)

app.get("/terms", async (req, res) => {
  const allTerms = await Term.find();
  res.render("terms/index.ejs", { terms: allTerms });
});

// Update a term (UPDATE)

app.get("/update-term", async (req, res) => {
    const targetTerm = await Term.findByIdAndUpdate(req.params.termId, req.body);
    res.redirect("/terms");
});

// Delete a term (DELETE)

app.delete("/terms/:termId", async (req, res) => {
  await Term.findByIdAndDelete(req.params.termId);
  res.redirect("/terms");
});