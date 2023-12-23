const jwt = require("jsonwebtoken")

const JWTMiddleWare = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;
    if (!token) {
        return res.Status(400).json({
            success: false,
            message:"not authrized"
        })
    }

try {
    const payload = jwt.verify(token, process.env.SECRET); 
    req.user  = {id:payload.id,email:payload.email}
    
} catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
}
  next();
};

module.exports = JWTMiddleWare;