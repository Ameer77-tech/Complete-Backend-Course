import {
  clearUsers,
  createUsers,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/user.service.js";

export const createUserController = async (req, res) => {
  const response = await createUsers(req.body);
  return res.status(response.statusCode).json({
    message: response.message,
    success: response.success,
    ...(response.user ? { user: response.user } : {}),
  });
};

export const getAllUsers = async (req, res) => {
  const users = await getUsers();
  return res.status(200).json({
    message: "Users Fetched",
    users,
    success: true,
  });
};

export const getAUser = async (req, res) => {
  const user = await getUser(req.params.id);
  if (user)
    return res.status(200).json({
      message: "User Fetched",
      user,
      success: true,
    });

  return res.status(404).json({
    message: "User Not Found",
    success: false,
  });
};

export const removeUser = async (req, res) => {
  const response = await deleteUser(req.params.id);
  return res.status(response.statusCode).json({
    message: response.message,
    success: response.success,
  });
};

export const updateAUser = async (req, res) => {
  const response = await updateUser(req.params.id, req.body);
  if (response.success) {
    return res.status(response.statusCode).json({
      message: "User Updated",
      success: true,
      updatedUser: response.updatedUser,
    });
  }

  return res.status(response.statusCode).json({
    message: response.message,
    success: false,
  });
};

export const deleteAllUsers = async (req, res) => {
  const response = await clearUsers();
  if (!response.success) {
    return res.status(500).json({
      message: response.message,
      success: false,
    });
  }

  if (response.deletedCount === 0) {
    return res.status(404).json({
      message: "No Users To Delete",
      success: false,
    });
  }

  return res.status(200).json({
    message: "All Users Deleted",
    success: true,
    deletedCount: response.deletedCount,
  });
};
