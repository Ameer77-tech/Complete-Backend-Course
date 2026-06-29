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
    }

    const user = await prisma.user.create({
      data: {
        userId: id,
        name: data.name,
        email: data.email.toLowerCase(),
      },
    });

    return {
      success: true,
      message: "User Created",
      statusCode: 201,
      user,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      userId: id,
    },
    select: {
      name: true,
      email: true,
    },
  });
};

export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: {
        userId: id,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "User Removed",
    };
  } catch (err) {
    if (err.code === "P2025") {
      return {
        success: false,
        statusCode: 404,
        message: "User Not Found",
      };
    }

    return {
      success: false,
      statusCode: 500,
      message: err.message || "Internal Server Error",
    };
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: "User Not Found",
      };
    }

    if (data.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email: data.email.toLowerCase(),
        },
      });

      if (emailExists && emailExists.userId !== id) {
        return {
          success: false,
          statusCode: 409,
          message: "User with that email already exists",
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        name: data.name ?? user.name,
        email: data.email ? data.email.toLowerCase() : user.email,
      },
      select: {
        userId: true,
        name: true,
        email: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      updatedUser,
    };
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      message: err.message || "Internal Server Error",
    };
  }
};

export const clearUsers = async () => {
  try {
    const result = await prisma.user.deleteMany({});
    return {
      success: true,
      deletedCount: result.count,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Internal Server Error",
    };
  }
};
