const mongoose = require ('mongoose')
const bcrypt= require('bcrypt')
const productSchema = mongoose.Schema({
    productTit: String,
    image:String,
    price: Number,
    category:String,
    hot:Number,
    comments:[String],
    date:String,
    discount:Number,
    cont:String,
  })

  const commentSchema= mongoose.Schema({
    useimg:String,
    commentContent:String,
  })

  const promoteSchema = mongoose.Schema({
    productTit: String,
    image:String,
    price: Number,
    category:String,
    hot:Number,
    comments:[commentSchema],
    date:String,
    discount:Number,
    cont:String,
    username:String,
    userImg:String,
  });
let appSchema = mongoose.Schema({
    fullname: String,
    username: { type: String, unique: true, require: true }   ,
    phoneNo: String,
    email: {type:String, unique:true, require:true},
    storename: String,
    password: String,
    usertype: String,
    rate: Number,
    verified: Boolean,
    comments: [String],
    customerSeller:Number,
    customerBuyer:Number,
    pin:String,
    cart:[productSchema],
    eachCart:[productSchema],
    balance:Number,
    promote:[productSchema],
    userImg:String,
})
let saltround=10
appSchema.pre('save', function(next){
  bcrypt.hash(this.password, saltround,(err, hash)=>{
    if(err){
      console.log('error occur when hashing', err);
    }
    else{
      this.password  = hash;
      console.log(this.password);
      next()
    }
  })
})

appSchema.methods.compareUser=async function(userPassword){
  try {
    const user = await bcrypt.compare(userPassword, this.password);
    return user;
  } catch (err) {
    console.error(err);
    return false;
  }
  }

let setDatabase = mongoose.model('userDetails', appSchema) 
module.exports = setDatabase