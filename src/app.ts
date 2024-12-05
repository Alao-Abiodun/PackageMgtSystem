import express, { Request, Response, NextFunction, Application } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import schema from "./schema"; 
import AppError from "./utils/lib/appError";
import { errorResponse, successResponse } from "./utils/lib/response";

const app: Application = express();

// set global variables
app.set("trust proxy", true);
// reduce app fingerprint
app.disable("x-powered-by");

// setup middleware
app.use(compression()); // compress all middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Apolo Server
const server = new ApolloServer({
  schema
})

// Start Apollo Server
async function startApolloServer() {
  await server.start();
  app.use('graphql', expressMiddleware(server))
}

startApolloServer();

// index route
app.get("/package", (req: Request, res: Response) => {
  return successResponse(res, "Welcome to Package Management System 🚀");
});


// handle 404 routes
app.all("*", async (req: Request, res: Response) => {
  return errorResponse(
    res,
    `Resource ${req.originalUrl} does not exist`,
    StatusCodes.NOT_FOUND
  );
});

// handle global error
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("error", error);
  const message =
    error.name === "Error" ? "Something went wrong" : error.message;
  const statusCode =
    error.name === "Error"
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : error.statusCode ?? StatusCodes.BAD_REQUEST;
  return errorResponse(res, message, statusCode);
});

export default app;
