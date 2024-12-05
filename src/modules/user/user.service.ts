import { UserModel, IUser } from "./user.model";
import bcrypt from "bcryptjs";
import AppError from "../../utils/lib/appError";

// Helper function for creating a user
export const createUser = async (input: IUser) => {
  const { username, email, password, role } = input;
  const existingUser = await UserModel.findOne({ email });
  
  if (existingUser) throw new AppError("User already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();
  return newUser;
};

// Helper function for user login
export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new AppError("Invalid credentials", 401);

  return user;
};

// Helper function for updating a user
export const updateUser = async (id: string, input: any) => {
  const user = await UserModel.findByIdAndUpdate(id, input, { new: true });
  if (!user) throw new AppError("User not found", 404);
  return user;
};

// Helper function for deleting a user
export const deleteUser = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);
  return true;
};
