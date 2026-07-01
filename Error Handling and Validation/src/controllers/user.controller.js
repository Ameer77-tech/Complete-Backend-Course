import successResponse from "../util/response.js";
import ConflictError from "../errors/ConflictError.js";

let users = [];

const registerController = (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.some((u, idx) => email == u.email);
  if (exists) {
    throw new ConflictError("User Already Exists");
  }
  users.push(req.body);
  return successResponse("User Created", 200, res);
};

export { registerController };
