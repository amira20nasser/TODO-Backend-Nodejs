const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();

  const randomS = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,randomS)
  next();

})

module.exports = mongoose.model("users", userSchema);