//warranty

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
let sequelize = require("../db");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/signup", function (req, res) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })

    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                //hi
                expiresIn: 60 * 60 * 24,
              });
              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({
                error:
                  "Login failed - Please check email and password and try again",
              });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
