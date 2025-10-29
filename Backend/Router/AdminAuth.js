const express = require('express')
const {SignupAdmin ,LoginAdmin} = require('../Controller/AuthController')
const Admin_router = express.Router()

Admin_router.post("/signup",SignupAdmin)
Admin_router.post("/login",LoginAdmin)


module.exports = Admin_router;