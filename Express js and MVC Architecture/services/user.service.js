let users = [];
import crypto from "crypto";

export const createUsers = (data) => {
  const id = crypto.randomUUID();
  let exists = false;
  users.forEach((u) => {
    if (u.email == data.email.toLowerCase()) {
      exists = true;
    }
  });
  if (exists) {
    return { message: "User with that email Already Exists", success: false };
  }
  users.push({
    id: id,
    name: data.name.toLowerCase(),
    email: data.email.toLowerCase(),
  });
  return { message: "User Created", success: true, id: id };
};

export const getUsers = () => {
  const allUsers = users.map((u) => {
    return {
      name: u.name,
      email: u.email,
    };
  });
  return allUsers;
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

  return user != null ? { name: user.name, email: user.email } : null;
};

export const deleteUser = (id) => {
  let found = false;
  users = users.filter((u) => {
    if (id === u.id) {
      found = true;
      return false;
    } else {
      return true;
    }
  });
  return found;
};

export const updateUser = (id, data) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      success: false,
      message: "User Not Found",
    };
  }

  const emailExists = users.some(
    (u) => u.id !== id && u.email === data.email.toLowerCase(),
  );

  if (emailExists) {
    return {
      success: false,
      message: "User with that email already exists",
    };
  }

  users[index] = {
    ...users[index],
    ...data,
    email: data.email.toLowerCase(),
  };

  return {
    success: true,
    updatedUser: users[index],
  };
};
export const clearUsers = () => {
  if (users.length < 1) {
    return false;
  }
  users = [];
  return true;
};
