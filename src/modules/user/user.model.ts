import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

// Create the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] }, // Example roles
});

// Create the Mongoose model for User
const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser };
