import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/errorHandler";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use("/api/v1", router);

// const getController = (req: Request, res: Response) => {
//   res.send("First Project");
// };

// app.get("/", getController);

app.use(globalErrorHandler);
app.use(notFound);

// console.log(process.cwd());

export default app;
