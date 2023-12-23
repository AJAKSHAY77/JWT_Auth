const express = require("express");
const { signup, signin, getUserInormation, logout } = require("../controller/authController");
const JWTMiddleWare = require("../middleware/Jwtauth");


const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.get("/user",JWTMiddleWare ,getUserInormation);
authRouter.get("/logout",JWTMiddleWare ,logout);


module.exports = authRouter;