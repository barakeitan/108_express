const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: 'Email address is required',
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    enum: ["Customer", "Admin"],
    default: "Customer",
  }
});

// encrypt the password before storing
userSchema.methods.encryptPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

userSchema.methods.validPassword = function (candidatePassword) {
  if (this.password != null) {
    return bcrypt.compare(candidatePassword, this.password);
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
