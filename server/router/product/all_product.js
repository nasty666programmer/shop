const {Router} = require('express');
const router = Router();
const Product = require('../../models/product');

router.get('/product/all',async(req,res) => {
    try {
        const product = await Product.find()
        .populate('userId','email name avatarUrl')
        .select("price title aboutProduct images")
        res.json({
            product
        })
    }catch(e) {
        console.log(e)
    }
})


module.exports = router;