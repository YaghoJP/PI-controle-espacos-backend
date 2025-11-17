import * as multer from "multer";

declare global {
  namespace Express {
    interface Request {
      user_id: number;
      user_role: string;
      file?: multer.Multer.File;
      files?: multer.Multer.File[];
    }
  }
}

export {};
