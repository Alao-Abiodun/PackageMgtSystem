import mongoose, { Document, Schema } from "mongoose";

interface IPackage extends Document {
  name: string;
  description: string;
  price: number;
  expirationDate: string;
}

// Create the Package schema
const packageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  expirationDate: { type: String, required: true },
});

// Create the Mongoose model for Package
const PackageModel = mongoose.model<IPackage>('Package', packageSchema);

export { PackageModel, IPackage };
