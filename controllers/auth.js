const bcrypt = require("bcrypt");

const User = require("../models/user.js");

const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

req.session.user = {
  username: user.username,
};

req.session.save(() => {
  res.redirect("/");
});


router.post("/sign-up", async (req, res) => {
  res.send("Form submission accepted!");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

req.session.user = {
  username: userInDatabase.username,
};

req.session.save(() => {
  res.redirect("/");
});


router.post("/sign-in", async (req, res) => {
  res.send("Request to sign in received!");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

req.session.destroy(() => {
  res.redirect("/");
});
