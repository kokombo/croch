import type * as http from "node:http";

declare module "express-serve-static-core" {
  export interface Request extends http.IncomingMessage, Express.Request {
    user: User;
    files: Express.Multer.File[];
  }
}
