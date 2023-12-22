const express = require("express");
const { signup, signin, getUserInormation } = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.get("/user",getUserInormation)


module.exports = authRouter;