import express from "express";
import { UsersController } from "../controllers/users.controller";
import AsyncHandler from "express-async-handler";

export const userRoutes = express.Router();

userRoutes.get("/users", AsyncHandler(UsersController.getAll));
userRoutes.get("/users/:id", AsyncHandler(UsersController.getById));
userRoutes.post("/users", AsyncHandler(UsersController.save));
userRoutes.put("/users/:id", AsyncHandler(UsersController.update));
userRoutes.delete("/users/:id", AsyncHandler(UsersController.delete));