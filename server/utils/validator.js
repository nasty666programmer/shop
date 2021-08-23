const {body} = require('express-validator');
const User = require('../models/user');


exports.registerValidators = [
    body('email').isEmail().withMessage('Введите корректный email')
    .custom(async(value,{req}) => {
        try {
            const user = await User.findOne({email:value});
            if (user) {
                return Promise.reject('Пользователь с таким email уже существует')
            }
        }catch(e) {
            console.log(e)
        }
    }).normalizeEmail(),
    body("password",'Пароль должен быть минимум 6 символов').isLength({ min: 6, max: 56 }).isAlphanumeric().trim(),

  body('name').isLength({min:3}).withMessage('Имя должно быть минимум 3 символа').trim()
]


exports.loginValidators = [
    body('email').isEmail().withMessage("Введите корректный email").normalizeEmail().custom(async (value,{req}) => {
        try {
            const candidate = await User.findOne({ email:req.body.email });
            if (!candidate) {
                return Promise.reject('Такого пользователя не существует')
            }
    }catch(e) {
        console.log(e)
    }
    }),
    body('password','Неправильный пароль').isLength({ min: 6, max: 56 }).isAlphanumeric().trim()
]

exports.editProfile = [
    body("password",'Пароль должен быть минимум 6 символов').isLength({ min: 6, max: 56 }).isAlphanumeric().trim(),

  body('name').isLength({min:3}).withMessage('Имя должно быть минимум 3 символа').trim()
]

exports.courseValidators = [
    body('name_product').isLength({min: 3}).withMessage('Минимальная длинна названия 3 символа').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('about_product').isLength({min: 10}).withMessage('Минимальная длинна названия 10 символа').trim()
]