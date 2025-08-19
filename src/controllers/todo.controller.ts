import { Router, type Request, type Response } from "express";
import { ZodError } from "zod";
import { prisma } from "../config/db.config";
import {
  CREATE_TODO_VALIDATION,
  UPDATE_TODO_VALIDATION,
} from "../validations/todo.validation";
const TodoRouter: Router = Router();

TodoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = CREATE_TODO_VALIDATION.parse(body);

    const todo = await prisma.todo.create({
      data: {
        title: payload.title,
        description: payload.description,
        completed: payload.completed,
      },
    });

    return res.status(200).json({ message: "Todo Created", todo });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation Error" });
    } else {
      return res.status(400).json({ message: "Cannot create todo" });
    }
  }
});

TodoRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const payload = UPDATE_TODO_VALIDATION.parse(body);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: payload.title,
        description: payload.description,
        completed: payload.completed,
      },
    });

    return res.status(200).json({ message: "Todo Updated", updatedTodo });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation Error" });
    } else {
      return res.status(400).json({ message: "Unable to update" });
    }
  }
});

TodoRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return res.status(400).json({ message: "Data not valid" });
    }

    if (id === todo?.id) {
      await prisma.todo.delete({
        where: {
          id: id,
        },
      });
    }

    return res.status(200).json({ message: "Todo Deleted", todo });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation Error" });
    } else {
      return res.status(400).json({ message: "Unable to delete" });
    }
  }
});

export default TodoRouter;
