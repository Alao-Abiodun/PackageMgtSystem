import { createPackage, updatePackage, deletePackage } from "./package.service";
import { IPackage, PackageModel } from "./package.model";

// Resolver for creating a package
const createPackageResolver = async (_: IPackage, { input }: { input: IPackage }) => {
  return await createPackage(input);
};

// Resolver for updating a package
const updatePackageResolver = async (_: IPackage, { id, input }: { id: string, input: IPackage }) => {
  return await updatePackage(id, input);
};

// Resolver for deleting a package
const deletePackageResolver = async (_: IPackage, { id }: { id: string }) => {
  return await deletePackage(id);
};

// Resolver for getting a single package by ID
const getPackageResolver = async (_: IPackage, { id }: { id: string }) => {
  const packageData = await PackageModel.findById(id);
  if (!packageData) {
    throw new Error("Package not found");
  }
  return packageData;
};

// Resolver for getting all packages, with optional filters (like expiration date)
const getPackagesResolver = async (_: IPackage, { expirationDate }: { expirationDate?: string }) => {
  if (expirationDate) {
    return await PackageModel.find({ expirationDate });
  } else {
    return await PackageModel.find();
  }
};

const packageResolvers = {
  Query: {
    // Fetch all packages or filter by expiration date
    getPackages: getPackagesResolver,
    // Fetch a single package by ID
    getPackage: getPackageResolver,
  },
  Mutation: {
    // Create a new package
    createPackage: createPackageResolver,
    // Update an existing package
    updatePackage: updatePackageResolver,
    // Delete a package
    deletePackage: deletePackageResolver,
  },
};

export default packageResolvers;
