const mongoose = require ('mongoose')
const productSchema = mongoose.Schema({
    owner:String,
    productTit: String,
    image:String,
    price: Number,
    category:String,
    hot:Number,
    // comments:[String],
    date:String,
    discount:Number,
    username:String,
    cont:String,
})

let productTable = mongoose.model('allProducts', productSchema)
module.exports = productTable