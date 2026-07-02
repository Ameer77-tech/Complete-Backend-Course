import userSchema from "../schema/user.schema.js";

const registerValidate = (req, res, next) => {
  const ok = userSchema.parse(req.body);
  req.body = ok
  next();
};

export { registerValidate };
