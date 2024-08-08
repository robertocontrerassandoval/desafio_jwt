import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js"
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//rutas
app.use('/', userRoutes)

app.listen(PORT, () => console.log(`Servidor funcionando http:localhost:${PORT}`));