const validate = (req, res, next) => {
  if (!req.body || req.body == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Fill All Details" });
  }
  const { name, email } = req.body;
  if (name == "" || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Name Is Required" });
  }
  if (email == "" || !email) {
    return res
      .status(400)
      .json({ success: false, message: "email Is Required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }
  next();
};

export const update = (req, res, next) => {
  if (!req.body || req.body == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Fill All Details" });
  }
  const { name, email } = req.body;
  if (!name && name == "" && !email) {
    return res
      .status(401)
      .json({ message: "Name or Email Required", success: false });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email) {
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }
  }

  next();
};

export default validate;
