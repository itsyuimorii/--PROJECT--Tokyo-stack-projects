const mongoose = require("mongoose");

//set collection rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  //admin or normal user
  role: {
    type: String,
    required: true,
  },
  //0 is enabled, 1 is disabled
  state: {
    type: Number,
    default: 0,
  },
});

/*-----testing code here------*/
/* //set collection 

const User = mongoose.model("User", userSchema);

User.create({
  username: "admin",
  email: "admin@example.com",
  password: "000000",
  role: "admin",
  state: 0,
})
  .then(() => {
    console.log("user created successfully");
  })
  .catch(() => {
    console.log("error creating user");
  }); */

module.exports = {
  User: User,
};
