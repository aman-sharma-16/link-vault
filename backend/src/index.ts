import cookieParser from "cookie-parser";
import { app } from "./app";
import { HOST, PORT } from "./constants/server.constants";
import { static as expressStatic } from "express";
import { json } from "express";
import { errorMiddleware } from "./middlewares/errors.middleware";
import cors from "cors";
import helmet from "helmet";
import { vaultRouter } from "./features/vault/route";
import { authRouter } from "./features/auth/route";

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  }),
);

app.use("/", expressStatic("./public"));
app.use(json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/vault", vaultRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server listening at ${HOST}:${PORT}`);
  }
});
