import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDefs from "../modules/user/user.typeDefs";
import userResolvers from "../modules/user/user.resolver";
import packageTypeDefs from "../modules/package/package.typeDefs";
import packageResolvers from "../modules/package/package.resolver";

const typeDefs = mergeTypeDefs([userTypeDefs, packageTypeDefs]);
const resolvers = mergeResolvers([userResolvers, packageResolvers]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
