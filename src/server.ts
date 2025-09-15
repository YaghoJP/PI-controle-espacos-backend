import express, { Request, Response } from "express";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router) 

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});