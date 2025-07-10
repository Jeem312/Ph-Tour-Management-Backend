import {Server} from "http";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { promise } from "zod";
import { envConfig } from "./app/config/env";


let server: Server;
const app = express();
const startServer = async () => {
  try{
    await mongoose.connect(envConfig.DB_URL,);
    console.log("Connected to MongoDB");
    server = app.listen(envConfig.PORT, () => {
      console.log(`Server is running on port ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Tour Management System API"
  })
});
startServer();

// Handle graceful shutdown
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
process.on("unhandledRejection", () => {
    
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down gracefully...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Promise.reject(new Error("Unhandled Rejection"));

// throw new Error("This is an uncaught exception");
