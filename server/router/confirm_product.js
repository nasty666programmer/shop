const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/verify-sale',async(req,res) => {
    try {
        const user = await User.find({_id:req.session.user._id});
            // console.log('s',user)
            let data = user.map(el => el.activity.carts)
        res.json({
            items_confirm: data.flat()
        })

        // const user = await User.find({_id:re})

        // res.json({a:true})
    }catch(err) {
        console.log(err)
    }
})

router.post('/verify-sale/success-sale',async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        let filters_sale = user.activity.carts.filter((el,i) => el._id !== req.body._id)
        const user_sales = await User.findById(req.body.user_pending);
        // console.log('222',user_sales)
        let cart = {
            items: []
        };
        cart.items.push(req.body);
        console.log('*',req.body) 
        User.updateOne({_id:req.body.user_pending}, 
                {cart}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }
            });
            //delete old value iin product 
            const fltr = user.cart.items.filter(el => el !== req.body._id)
            User.updateOne({_id:req.user_id}, 
                {cart:{items:fltr}}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }
            });

        // console.log('sss',filters_sale)
    }catch(e) {
        console.log(e)
    }
})


module.exports = router;