import express, { Request, Response } from "express";
import { HandleError } from "./middlewares/ErrorHandler";
import { router } from './routes';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(router);

//Tratamento de erro
app.use(HandleError)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});