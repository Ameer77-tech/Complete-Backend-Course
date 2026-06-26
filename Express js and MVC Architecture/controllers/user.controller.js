import {
  createUsers,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/user.service.js";

export const createUserController = (req, res) => {
  const response = createUsers(req.body);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getAllUsers = (req, res) => {
  const users = getUsers();
  return res
    .status(200)
    .json({ message: "Users Fetched", users, success: true });
};

export const getAUser = (req, res) => {
  const user = getUser(req.params.id);
  if (user != undefined || user != null)
    return res
      .status(200)
      .json({ message: "Users Fetched", user, success: true });
  else
    return res.status(404).json({ message: "User Not Found", success: false });
};

export const removeUser = (req, res) => {
  const deleted = deleteUser(req.params.id);
  if (deleted) {
    return res.status(200).json({ message: "User Removed", success: true });
  } else {
    return res
      .status(500)
      .json({ message: "User Removal Failed", success: false });
  }
};

export const updateAUser = (req, res) => {
  const updated = updateUser(req.params.id, req.body);
  if (updated.success) {
    return res.status(200).json({ message: "User Updated", updated });
  } else {
    return res.status(404).json({ message: "User Not Found", ...updated });
  }
};
