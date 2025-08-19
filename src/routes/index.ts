import { Router } from "express";
import TodoRouter from "../controllers/todo.controller";

const RouteHandler: Router = Router();

RouteHandler.use("/api/v1/todos", TodoRouter);

export default RouteHandler;
