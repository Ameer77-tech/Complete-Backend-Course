import userSchema from "../schema/user.schema.js";
const registerValidate = (req, res, next) => {
  const ok = userSchema.parse(req.body);
  console.log(ok);
  next();
};

export { registerValidate };
