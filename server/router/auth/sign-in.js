const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { loginValidators } = require("../../utils/validator");
const { validationResult } = require("express-validator");
const signEmail = require("../../emails/signin");
const keys = require("../../keys/keys");
var nodemailer = require("nodemailer");

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.json({
      redirect: "/auth/sign-in",
    });
  });
});

router.post("/sign-in", loginValidators, async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.json({
        message: error.array()[0].msg,
      });
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      const isSame = await bcrypt.compare(password, candidate.password);
      if (isSame) {
        let token = jwt.sign({
          password:candidate.password
        },
        "dev-jwt",
        {expiresIn:60*60}
        )
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
        });

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: keys.email_login,
            pass: keys.email_password,
          },
        });

        transporter.sendMail(signEmail(email), function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.json({
          redirect: "/dashboard",
          isAuth: true,
          token
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
  next();
});

module.exports = router;
