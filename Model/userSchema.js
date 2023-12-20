const mongoose = require("mongoose")
const { Schema } = mongoose;

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

const userModel = mongoose.model('user', userSchema)

module.exports = userModel; 