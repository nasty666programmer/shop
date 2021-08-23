const {Schema,model} = require('mongoose');

const user = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatarUrl:String,
    cart:{
        items: [
            {
                count: {
                    type:Number,
                    required:true,
                    default:1
                },
                productId: {
                    required:false,
                    ref:'product',
                    type:Schema.Types.ObjectId
                }
            }
        ]
    },

    user_pending:Array,
    activity:{
        carts: Array
    }
})


user.methods.addToCart = function(product) {
    console.log('product add to cart: ',product);

    const items = [...this.cart.items]
    const idx = items.findIndex(el => {
        return el.productId.toString() === product._id.toString();
    })

    if (idx >= 0) {
        items[idx].count = items[idx].count + 1;
    }else {
        items.push({
            productId:product._id,
            count:1
        })
    }

    this.cart = {items}

    return this.save()

}

user.methods.removeFromCart = function(id) {
    let items = [...this.cart.items];
    const idx = items.filter(c => {
        return c.productId.toString() !== id.toString()
    })

    // if (items[idx].count === 1) {
    //     items.filter(c => c.productId.toString() !== id.toString())
    // }else {
    //     items[idx].count--
    // }
    console.log('idx',idx)

    this.cart.items = idx
    return this.save();
}

user.methods.clearCart = function() {
    this.cart.items = [];
    return this.save();
}

user.methods.addToActivity = function(data) {
    this.activity.carts = this.activity.carts.concat(...data);
   return  this.save();
    //  console.log('items add: ',res)

}

module.exports = model('user',user)