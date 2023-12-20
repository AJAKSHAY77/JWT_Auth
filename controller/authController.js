const userModel = require("../Model/userSchema");

const signup =  async (req, res, next) => {
    
    const { name, email, password, confirm_password } = req.body
    console.log(name, email, password, confirm_password);

    try {
        
    const userInfo = userModel(req.body);

    const result = await userInfo.save();
    return res.status(201).json({
      success: true,
      data: result,
    });   
        
    } catch (error) {

        if (error.code ===11000) {
            return res.status(400).json({
                success: false,
                message : `Account is already exists with provided email if  `
           }) 
        }
        return res.status(400).json({
            success: true,

        })
    }

}
module.exports = {
    signup
}