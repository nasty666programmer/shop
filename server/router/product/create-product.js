const {Router} = require('express');
const router = Router();
const auth = require('../../middleware/auth');
const Product = require('../../models/product');
const {courseValidators} = require('../../utils/validator');
const { validationResult } = require("express-validator");
const path = require('path');

router.post('/create',auth,courseValidators,async(req,res) => {
    let jsonData = JSON.parse(req.body.product);
    
    const error = validationResult(jsonData);

    if (!error.isEmpty()) {
        return res.json({
            message:error.array()[0].msg
        })
    }
        
        let product = new Product({
            title:jsonData.name_product,
            price:+jsonData.price,
            aboutProduct:jsonData.about_product,
            images:req.file.path,
            userId:req.user
        });

    try {
        await product.save();
        res.json({
            redirect:'/dashboard'
        })
    }catch(e) {
        console.log(e)
    }
})

module.exports = router;

