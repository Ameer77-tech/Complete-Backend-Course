let users = [];
import crypto from "crypto";

export const createUsers = (data) => {
  const id = crypto.randomUUID();
  users.push({
    id: id,
    name: data.name.toLowerCase(),
    email: data.email.toLowerCase(),
  });
  return { message: "User Created", success: true, id: id };
};

export const getUsers = () => {
  return users;
};

export const getUser = (id) => {
  const user = users.find((u) => {
    if (u.id === id) {
      return {
        name: u.name,
        email: u.email,
      };
    }
  });
  return user;
};

export const deleteUser = (id) => {
  let found = false;
  users = users.filter((u) => {
    if (id === u.id) {
      found = true;
      return true;
    }
  });
  return found;
};

export const updateUser = (id, data) => {
  const updatedUser = null;
  users.forEach((u, idx) => {
    if (u.id === id) {
      u[idx] = { ...data };
      updatedUser = u[idx];
    }
  });
  if (updatedUser != null) {
    return { success: true, updatedUser };
  } else {
    return { success: false };
  }
};
