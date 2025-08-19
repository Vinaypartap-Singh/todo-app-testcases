import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from "express";
import RouteHandler from "./src/routes";
const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

// routes

app.use(RouteHandler);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Up & Running" });
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);

export default app;
