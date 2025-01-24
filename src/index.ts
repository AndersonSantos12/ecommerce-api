import express from "express";
import { routes } from "./routes/index";

const app = express();
routes(app);

/*
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo ao Meu Servidor!");
});
*/


app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});