import express, { Request, Response, Express, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { debug } from "console";
import { AddressInfo } from "net";

import "dotenv/config";
import { routes } from "./routes/index.routes";

const app: Express = express();

interface ErrorInterface extends Error {
  status?: number;
}

app.use(bodyParser.json());
app.use(logger("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.set("port", process.env.API_PORT || 5000);

//Middleware
routes(app);

//Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: ErrorInterface = new Error("Not found");
  err.status = 404;
  next(err);
});

//Errors Handlers
if (app.get("env") === "development") {
  app.use((_err: Error, req: Request, res: Response) => {
    return res
      .status(Number(res.status) || 500)
      .send({ Error: { message: _err.message, err: _err } });
  });
}

interface addressInfo extends AddressInfo {}

const server = app.listen(app.get("port"), () => {
  debug(
    "Express server listening on port " + (server.address() as addressInfo).port
  );
});
