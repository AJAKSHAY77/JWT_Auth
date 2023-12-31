const userModel = require("../Model/userSchema");
const emailvalidator = require("email-validator");
const bycrypt = require("bcrypt")

const signup = async (req, res, next) => {
  const { name, email, password, confirm_password } = req.body;
  console.log(name, email, password, confirm_password);

  if (!name || !email || !password || !confirm_password) {
    res.status(400).json({
      success: false,
      message: `Every Field is required`,
    });
  }

  const validEmail = emailvalidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: `please provide a valid email id`,
    });
  }

  if (password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: `password and confirm password does'nt match`,
    });
  }
  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Account is already exists with provided email if  `,
      });
    }
    return res.status(400).json({
      success: true,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every Field is mandatory",
    });
  }

  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select(`+password`);

    if (!user ||  !(await bycrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "invalid crendentails",
      });
    }

    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserInormation = async (req, res, next) => {
  const userid = req.user.id;

  try {
    const user = await userModel.findById(userid);
    console.log(user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };

    res.cookie("token", null, cookieOption);
    res.status(200).json({
      succes: true,
      message :"logged out"
    })
  } catch (error) {
     return res.status(400).json({
       success: false,
       message: error.message,
     });
  }
};

module.exports = {
  signup,
  signin,
  getUserInormation,
  logout,
};
