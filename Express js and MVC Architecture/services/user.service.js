let users = [];
import crypto from "crypto";
import prisma from "../config/prisma.js";

export const createUsers = async (data) => {
  const id = crypto.randomUUID();
  try {
    const exists = await prisma.user.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });
    if (exists) {
      return {
        success: false,
        message: "User with that email already exists",
        statusCode: 409,
      };
    } else {
      await prisma.user.create({
        data: {
          userId: id,
          name: data.name,
          email: data.email.toLowerCase(),
        },
      });
      return { success: true, message: "User Created", statusCode: 200 };
    }
  } catch (err) {
    return { success: false, message: err.message, statusCode: 500 };
  }
};

export const getUsers = async () => {
  return await prisma.user.findMany();
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
  console.log(data);

  if (data.email) {
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
  }
  users[index] = {
    ...users[index],
    ...data,
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
