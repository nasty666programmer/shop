const {Router} = require('express');
const router = Router();
const {validationResult} = require('express-validator');
const {registerValidators} = require('../../utils/validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../../models/user')
const sendgrid = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
const regEmail = require('../../emails/registration')
const keys = require('../../keys/keys');
var nodemailer = require('nodemailer');




router.post('/registration', registerValidators, async (req,res) => {
  try {
        const {email,password,name} = req.body
        const error = validationResult(req);
       
        if (!error.isEmpty()) {
            // req.flash('error',error.array()[0].msg)
            return res.json({
        
                message:error.array()[0].msg
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({
            email,
            password:hashPassword,
            name
        })
        await user.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: keys.email_login,
              pass: keys.email_password
            }
          });
          
          
          transporter.sendMail(regEmail(email), function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          

       return res.json({
            redirect:'/auth/sign-in'
        })

       
    }catch(e) {
        res.status(400)
    }
})


module.exports = router;