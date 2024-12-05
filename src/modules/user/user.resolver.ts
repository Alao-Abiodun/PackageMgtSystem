import { createUser, loginUser, updateUser, deleteUser } from "./user.service";
import { IUser, UserModel } from './user.model';

// Create user
const createUserResolver = async (_: IUser, { input }: { input: IUser }) => {
  return await createUser(input);
};

// Login user
const loginUserResolver = async (_: IUser, { email, password }: { email: string, password: string }) => {
  return await loginUser(email, password);
};

// Update user
const updateUserResolver = async (_: IUser, { id, input }: { id: string, input: IUser }) => {
  return await updateUser(id, input);
};

// Delete user
const deleteUserResolver = async (_: IUser, { id }: { id: string }) => {
  return await deleteUser(id);
};

const userResolvers = {
  Query: {
    getUser: async (_: IUser, { id }: { id: string }) => {
      return UserModel.findById(id);
    },
    getUsers: async () => {
      return UserModel.find();
    },
  },
  Mutation: {
    createUser: createUserResolver,
    login: loginUserResolver,
    updateUser: updateUserResolver,
    deleteUser: deleteUserResolver,
  },
};

export default userResolvers;
