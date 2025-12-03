import express from 'express';
import cors from 'cors';
import { router } from './routes';

import { HandleError } from './middlewares/ErrorHandler';
import path from 'path';

const app = express();

const port = process.env.PORT || 3333;

app.use(express.json());

app.use(cors());

app.use(router);

app.use(HandleError)

app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});