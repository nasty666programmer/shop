const {Router} =  require('express');
const router = Router();
const Product = require('../../models/product');
const User = require('../../models/user')
const confirmOrder = require('../../emails/confirm_order')
var nodemailer = require('nodemailer');
var keys = require('../../keys/keys');

function mapCartItems(cart) {
    console.log('Cart: ', cart)
    return cart.items.map(el => ({
        ...el.productId,
         id: el.productId.id,
         count:el.count
    }))
}

function computePrice(product) {
    return product.reduce((total,course) => {
        return total += course.price * course.count
    },0)
}

router.post('/add',async(req,res) => {
    try {
        const {id} = req.body;
        let product = await Product.findById(id);
        await req.user.addToCart(product);
    }catch(e) {
        console.log(e)
    }
})


router.get('/',async(req,res) => {
    try {

            const user = await req.user
            .populate('cart.items.productId')
            .execPopulate();

            let cart_id = user.cart.items.map(el => el.productId); 

            let id_usr = cart_id.map((el) =>  Product.findById(el))
            // let r = await id_usr
        // console.log('sadsad',id_usr)

       

    const product = mapCartItems(user.cart)

    res.json({
        product,
        price:computePrice(product),
        user_id:req.user._id
    })

    }catch(e) {
        console.log(e)
    }
})


router.delete('/delete/:id',async(req,res) => {
    try {
        await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.productId').execPopulate()
    
    const product = mapCartItems(user.cart)
    const cart = {
    product,price:computePrice(product)
    }
    console.log(cart)

    // res.status(200).json(cart)
    }catch(e) {
        console.log(e)
    }
})


router.post('/buy-product',async(req,res) => {
    try {
        console.log('dasdasd',req.body)
        const id = req.body.map(el => el.userId);
 
        const user = await User.find().where('_id')
        .in(id).exec();
        
        const userActivity = await User.find({_id:id});
            let cartsActivity = userActivity.map(el => el.activity.carts);
            let _el_req = req.body.map(el => el)    
            cartsActivity.push(_el_req);

           

            User.updateOne({_id:id}, 
                {activity:{carts:cartsActivity.flat()}}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }
            });


            
            

        // await req.user.addToActivity(req.body)
        const email = user.map(el => el.email)

        

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: keys.email_login,
              pass: keys.email_password
            }
          });
          
          
          transporter.sendMail(confirmOrder(email), function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          await req.user.clearCart();

          res.json({
              message:'Запрос отправлен.Ждите подтвержения от продавцов'
          })
        
        }catch(err) {
        console.log(err);
    }
})

module.exports = router;