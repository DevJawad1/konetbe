const express = require ('express')
const {
    backendSignup, 
    backendLogin, 
    home, uploadproduct, 
    verifyToken
} = require ('../Controllers/user.controller')
const router = express.Router()

router.post('/backendsignup', backendSignup)
router.post('/backendlogin', backendLogin)
router.post('/home', home)
router.get('/token', verifyToken)
router.post('/uploadproduct', uploadproduct)
module.exports = router