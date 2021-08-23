const {Schema,model} = require('mongoose');

const product = new Schema({
    title: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    aboutProduct:String,
    images:String,
    userId: {
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports = model('product',product)