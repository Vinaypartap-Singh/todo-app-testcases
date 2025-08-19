import z from "zod";

export const CREATE_TODO_VALIDATION = z.object({
  title: z.string("Title is required").min(3, "min 3"),
  description: z.string("Title is required").min(15, "min 15"),
  completed: z.boolean("either true or false"),
});

export const UPDATE_TODO_VALIDATION = z.object({
  title: z.string("Title is required").min(3, "min 3").optional(),
  description: z.string("Title is required").min(15, "min 15").optional(),
  completed: z.boolean("either true or false").optional(),
});
