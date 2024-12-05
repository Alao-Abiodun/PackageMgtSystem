import { PackageModel, IPackage } from "./package.model";
import AppError from "../../utils/lib/appError";
import tryCatch from '../../utils/helpers/tryCatch.helper';

// Helper function for creating a package
export const createPackage =  tryCatch(
    async (input: IPackage) => {
        const { name, description, price, expirationDate } = input;
        
        const newPackage = new PackageModel({
          name,
          description,
          price,
          expirationDate,
        });
      
        await newPackage.save();
        return newPackage;
      }
)

// Helper function for updating a package
export const updatePackage = tryCatch(
    async (id: string, input: any) => {
        const updatedPackage = await PackageModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedPackage) throw new AppError("Package not found", 404);
        return updatedPackage;
      }
)

// Helper function for deleting a package
export const deletePackage = tryCatch(
    async (id: string) => {
        const result = await PackageModel.findByIdAndDelete(id);
        if (!result) throw new AppError("Package not found", 404);
        return true;
      }
)
