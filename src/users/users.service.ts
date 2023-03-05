import { PrismaClient } from "@prisma/client";
import { User } from "./user.interface";
import { randUuid } from "@ngneat/falso";

const prisma = new PrismaClient();

export const findAll = async (country) => {
  try {
    if (country) {
      const users = await prisma.user.findMany({
        where: { country },
      });
      return users
    }
    const users = await prisma.user.findMany();
    return users;  
  } catch (e) {
    console.log(e)
    return 'fail to get users'
  }
};

export const find = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (e) {
    console.log(e)
    return 'fail to get user'
  }
};

export const create = async (newUser: User) => {
  newUser.id = randUuid()
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newUser.email);
  console.log(newUser)
  try {
    await prisma.user.create({
      data: newUser,
    });
    return 'success to create';
  } catch (e) {
    console.log(e)
    return 'fail to create'
  }
};

export const update = async (id: string, userUpdate: User) => {
  try {
    await prisma.user.update({
      where: { id: id },
      data: userUpdate,
    });
    return 'update successful';
  } catch (e) {
    console.log(e)
    return 'failed to update'
  }
};

export const remove = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    return 'delete successful';
  } catch (e) {
    console.log(e)
    return 'failed to delete'
  }
};
