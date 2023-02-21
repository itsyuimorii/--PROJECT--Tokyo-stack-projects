// 引入joi模块
const Joi = require("joi");

// Define the validation rules for the object
const schema = {
  username: Joi.string()
    .min(2)
    .max(5)
    .required()
    .error(new Error("The username attribute does not pass validation")),
  birth: Joi.number()
    .min(1900)
    .max(2020)
    .error(new Error("birth did not pass validation")),
};

async function run() {
  try {
    // Implementation Validation
    await Joi.validate({ username: "ab", birth: 1800 }, schema);
  } catch (ex) {
    console.log(ex.message);
    return;
  }
  console.log("Verification passed");
}

run();
