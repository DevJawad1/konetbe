const setDatabase = require ('../Modals/user.modal')
const productTable = require ('../Modals/product.modal')
const commentContent= require('../Modals/productCOM.modal')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const backendSignup=(req, res)=>{
    console.log('Begin backend for signup');
    console.log(req.body);
    let saveUser = new setDatabase(req.body)
    saveUser.save().then(()=>{
        console.log(req.body);
        console.log('Konet user save');
        res.send({status:true, message:"Sucessfully sign up"})
    }).catch((err)=>{
        console.log('Error occur', err);
        res.send({status:false, message:"Can't sign up"})
    })
}

const backendLogin = (req, res)=>{
    console.log('Begin backend for login');
    const {email, password, username} = req.body
    setDatabase.findOne({ email:email }).then(async (user)=>{
      console.log(user);
      if (user) {
        try {
          const result = await user.compareUser(password);
          
          if (result) {
            console.log('User found');
            console.log(user);
            let token = jwt.sign({email}, SECRET, {expiresIn:"1h"})
            res.send({ status: true, message: "User found", details: user, token });
          } else {
            res.send({ status: false, message: "Password does not match" });
          }
        } catch (err) {
          console.log('Error occurred during password comparison:', err);
          res.send({ status: false, message: "Error occurred" });
        }
      } else {
        console.log("User not found");
        res.send({ status: false, message: "User not found" });
      }    
    }).catch((err)=>{
      console.log('error occur',err);
    })
}

const verifyToken=(req, res)=>{
  let token = req.headers.authorization.split(" ")[1]
  // console.log(token);
  jwt.verify(token, SECRET, ((err, result)=>{
    if(err){
      console.log(err);
      res.send({tokstatus:false})
    }
    else{
      res.send({tokstatus:true, result})
    }
  }))
}


const home = async (req, res) => {
  try {
    const getProduct = await productTable.find({});
    const getComment = await commentContent.find({});
    res.send({ allproducts: getProduct, allcoments: getComment });

    if (Object.keys(req.body.usercomment).length === 0) {
      console.log('The object is empty.');
    } else {
      console.log(req.body);
      let savecom = new commentContent(req.body.usercomment);
      savecom.save()
        .then(() => {
          console.log('Com save successfully');
        })
        .catch((err) => {
          console.log('cant save com', err);
        });
    }

    console.log(req.body);
    // Check if likecpro exists in req.body before accessing it
    
  } catch (err) {
    console.error('Error retrieving users: ' + err);
    console.log(req.body);
    if (req.body) {
      const likecpro = req.body.allLike;
      // Assuming 'likecpro' is an identifier for a product
      const getPro = await productTable.findOne({ _id: likecpro });
      if (getPro) {
        getPro.hot += 1;
        console.log(getPro);

        let saveProduct = new productTable(getPro);
        saveProduct.save()
          .then(() => {
            console.log('save like');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } 
  }
};

const uploadproduct = (req, res)=>{
  console.log('productupload');
  console.log(req.body);
  let saveProduct = new productTable (req.body.newpro)
  saveProduct.save().then(()=>{
    res.send({message:"Product uploaded successfully"})
  }).catch((err)=>{
    res.send({errmessage:"Product upload failed"})
  })
}
module.exports = {backendSignup, backendLogin, home, uploadproduct, verifyToken}