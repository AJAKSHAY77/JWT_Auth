const mongoose = require("mongoose")
const { Schema } = mongoose;
const jwt = require("jsonwebtoken")
const bycrypt = require("bcrypt")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `user name is Required`],
      minLength: [5, ` Name must be atleast 5 char.`],
      maxLength: [50, `Name must be less then 50 char`],
      trim: true,
    },
    email: {
      type: String,
        required: [true, `user email is Required`],
        unique: true,
        lowercase: true,
        unique:[true,`already registered`]

    },
    password: {
        type: String,
        Select:false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
    
  }
  this.password = await bycrypt.hash(this.password, 10)
      return next();

})



userSchema.methods = {
    jwtToken(){
    return jwt.sign(
      { id: this.id, email: this.email },
      process.env.SECRET,
      { expiresIn:"24h"}
      );
    }
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel; 